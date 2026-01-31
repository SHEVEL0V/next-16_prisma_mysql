/** @format */
import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "@/types";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET is not defined in environment variables");
}
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  name: string;
  theme: string;
  expiresAt: number;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

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

export async function createSession(user: User) {
  const duration = 60 * 60 * 1000; // 1 h.
  const expiresAt = Date.now() + duration;
  const { id, name, theme } = user;
  const session = await encrypt({
    id,
    name,
    theme,
    expiresAt,
  });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const sessionValue = (await cookies()).get("session")?.value;

  return await decrypt(sessionValue);
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
