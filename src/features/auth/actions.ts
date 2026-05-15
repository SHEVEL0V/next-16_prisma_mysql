/** @format */
"use server";

import { createSafeAction } from "@/utils/wrapper-action";
import { loginSchema, registerSchema } from "./schema";
import { authService } from "./services";
import { deleteSession } from "@/utils/session";

/**
 * Register new user with email and password
 * Creates user account and establishes session automatically
 * 
 * @action
 * @schema registerSchema - Requires { name, email, password, confirmPassword }
 * @returns User object without password field
 * @revalidate Revalidates root path
 * @redirect Redirects to user dashboard on success
 * 
 * @security
 * - Password hashed with bcrypt (10 rounds)
 * - Email uniqueness validated
 * - Session encrypted with AES-256-GCM
 * - HTTP-only cookie with SameSite=Lax
 * 
 * @throws Error if email already exists
 */
export const registerAction = createSafeAction(
	registerSchema,
	async (data) => await authService.register(data),
	{
		revalidatePath: "/",
		redirectTo: (user) => `/user/${user.name}/menu`,
	},
);

/**
 * Login user with email and password
 * Authenticates credentials and establishes session
 * 
 * @action
 * @schema loginSchema - Requires { email, password }
 * @returns User object without password field
 * @revalidate Revalidates root path
 * @redirect Redirects to user dashboard on success
 * 
 * @security
 * - Password compared using timing-safe bcrypt.compare()
 * - Fake hash comparison prevents user enumeration
 * - Session encrypted with AES-256-GCM
 * - HTTP-only cookie with SameSite=Lax
 * - JWT expires in 7 days (configurable)
 * 
 * @throws Error if credentials are invalid
 */
export const loginAction = createSafeAction(
	loginSchema,
	async (data) => await authService.login(data),
	{
		revalidatePath: "/",
		redirectTo: (user) => `/user/${user.name}/menu`,
	},
);

/**
 * Logout current user
 * Clears session cookie and invalidates JWT token
 * 
 * @action
 * @returns Void
 * @revalidate Revalidates root path
 * @redirect Redirects to home page on success
 * 
 * @security
 * - Removes HTTP-only session cookie
 * - Invalidates JWT on server side
 * - No sensitive data in response
 */
export const logoutAction = async () => {
	await deleteSession();
};
