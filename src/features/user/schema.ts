/** @format */

/**
 * User Profile Validation Schema
 * Zod schema for user profile information updates
 */

import { z } from "zod";

/**
 * User profile update schema
 * Validates all profile fields with appropriate constraints
 * 
 * Fields:
 * - id (required): User UUID for identification
 * - name (required): Full name, minimum 3 characters
 * - position (required): Job title/position, 2-50 characters
 * - bio (optional): User biography, maximum 500 characters
 * - image (optional): Profile image URL, must be valid URL
 */
export const updateProfileSchema = z.object({
	id: z.uuid(),
	name: z.string().trim().min(3, "Ім'я занадто коротке"),
	position: z
		.string()
		.trim()
		.min(2, "Посада має бути не менше 2 символів")
		.max(50, "Надто довге повідомлення"),
	bio: z
		.string()
		.max(500, "Довжина біографії не може перевищувати 500 символів")
		.optional()
		.or(z.literal("")),
	image: z.url("Некоректний URL").optional().or(z.literal("")),
});
