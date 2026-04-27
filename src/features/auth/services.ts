/** @format */

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { createSession } from "@/utils/session";
import type { User } from "../../../generated/prisma/client";

// Number of salt rounds for bcrypt hashing
const SALT_ROUNDS = 10;

/**
 * Auth Service
 * Handles user authentication (login, registration) and password hashing
 */

// Type definitions for auth operations
export type AuthInput = Pick<User, "email" | "password">;
export type RegisterInput = Pick<User, "name" | "email" | "password">;

export const authService = {
	/**
	 * Login user with email and password
	 * Validates credentials and creates session on success
	 * @param data - Email and password
	 * @returns User object without password
	 * @throws Error if credentials are invalid
	 */
	login: async (data: AuthInput) => {
		const user = await prisma.user.findUnique({
			where: { email: data.email },
		});

		// Use timing-safe comparison with fake hash to prevent user enumeration
		const isPasswordValid = user
			? await bcrypt.compare(data.password, user.password)
			: await bcrypt.compare(data.password, "fake_hash");

		if (!user || !isPasswordValid) {
			throw new Error("Invalid email or password");
		}

		await createSession(user);

		// Remove password from response
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},

	/**
	 * Register new user with email and password
	 * Validates email uniqueness and hashes password before storing
	 * @param data - Name, email, and password
	 * @returns User object without password
	 * @throws Error if email already exists
	 */
	register: async (data: RegisterInput) => {
		// Check if user already exists (optimization: only fetch ID)
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
			select: { id: true },
		});

		if (existingUser) {
			throw new Error("User with this email already exists");
		}

		// Hash password asynchronously
		const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			},
		});

		await createSession(user);

		// Remove password from response
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},
};
