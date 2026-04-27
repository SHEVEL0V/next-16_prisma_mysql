/** @format */
"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import type { User } from "../../generated/prisma/client";

/**
 * Session Management Utilities
 * Handles JWT-based session encryption, decryption, and cookie management
 */

// Load and validate session secret from environment
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET is not defined in environment variables");
}
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Session payload structure stored in JWT
 */
type SessionPayload = {
  id: string;
  name: string;
  expiresAt: number;
};

/**
 * Encrypt session payload into JWT token
 * Uses HS256 algorithm with 7-day expiration
 *
 * @param payload - Session data to encrypt (user id, name, expiry)
 * @returns Encrypted JWT token string
 */
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Decrypt and verify JWT session token
 * Returns null if token is invalid or verification fails
 *
 * @param session - JWT token string to decrypt
 * @returns Decrypted session payload or null if invalid
 */
export async function decrypt(session: string | undefined = "") {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.error("⛔️ Session decryption failed", error);
    return null;
  }
}

/**
 * Create new user session
 * Encrypts user data and stores as HTTP-only cookie (1 hour duration)
 *
 * @param user - User object with id and name
 */
export async function createSession(user: User) {
  const duration = 60 * 60 * 1000; // 1 hour in milliseconds
  const expiresAt = Date.now() + duration;
  const { id, name } = user;

  const session = await encrypt({
    id,
    name,
    expiresAt,
  });

  const cookieStore = await cookies();

  // Set secure HTTP-only cookie with CSRF protection
  cookieStore.set("session", session, {
    httpOnly: true, // Prevents client-side access
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    expires: new Date(expiresAt),
    sameSite: "lax", // CSRF protection
    path: "/",
  });
}

/**
 * Get current session from cookies
 * Automatically decrypts and validates JWT token
 *
 * @returns Session payload if valid, null otherwise
 */
export async function getSession() {
  const sessionValue = (await cookies()).get("session")?.value;

  return (await decrypt(sessionValue)) as SessionPayload | null;
}

/**
 * Delete current user session
 * Clears session cookie on logout
 */
export async function deleteSession() {
  (await cookies()).delete("session");
}
