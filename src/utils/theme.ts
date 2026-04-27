/** @format */

/**
 * Theme Management Utilities
 * Handles application theme persistence (light/dark mode) via cookies
 */

"use server";

import { cookies } from "next/headers";

/**
 * Toggle application theme between light and dark
 * Reads current theme from cookie and switches to opposite
 * Persists new theme to secure HTTP-only cookie for 1 year
 * 
 * @returns New theme value ("light" | "dark")
 * 
 * @cookie
 * - Name: "theme"
 * - Expiration: 1 year (365 days)
 * - HttpOnly: true (prevents JavaScript access)
 * - Secure: true (HTTPS only in production)
 * 
 * @example
 * const newTheme = await toggleTheme();
 * console.log(newTheme); // "light" or "dark"
 */
export async function toggleTheme() {
	const cookieStore = await cookies();

	const themeCookie = cookieStore.get("theme");

	const currentTheme = themeCookie?.value === "dark" ? "dark" : "light";

	const newTheme = currentTheme === "dark" ? "light" : "dark";

	cookieStore.set("theme", newTheme, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 365, // 1 рік
		path: "/",
	});

	return newTheme;
}

/**
 * Get current application theme
 * Reads from cookie or defaults to "light"
 * 
 * @returns Current theme value ("light" | "dark")
 * 
 * @example
 * const theme = await getTheme();
 * console.log(theme); // "light" or "dark"
 */
export const getTheme = async () => {
	const cookieStore = await cookies();
	const themeCookie = cookieStore.get("theme");
	return themeCookie?.value === "dark" ? "dark" : "light";
};
