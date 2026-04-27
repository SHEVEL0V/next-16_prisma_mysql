/** @format */

/**
 * User Profile Server Actions
 * Handles user profile information updates
 */

"use server";

import { createSafeAction } from "@/utils/wrapperAction";
import { updateProfileSchema } from "./schema";
import { userService } from "./services";

/**
 * Update user profile information
 * Modifies name, position, biography, and profile image
 * All updates happen within a transaction for data consistency
 * 
 * @action
 * @schema updateProfileSchema - Requires { id, name, position, bio?, image? }
 * @returns Updated Profile object
 * @revalidate Revalidates user profile path to reflect changes
 * 
 * @transaction
 * - Updates user.name
 * - Upserts profile (creates if not exists, updates if exists)
 * 
 * @param name - User's full name (min 3 chars)
 * @param position - Job title/position (2-50 chars)
 * @param bio - Optional user biography (max 500 chars)
 * @param image - Optional profile image URL
 * 
 * @example
 * const result = await updateProfileAction(prevState, formData);
 * if (result.success) {
 *   console.log("Profile updated:", result.data);
 * } else {
 *   console.log("Validation errors:", result.errors);
 * }
 */
export const updateProfileAction = createSafeAction(
	updateProfileSchema,
	async (data) => {
		const { id, ...profileData } = data;
		return await userService.updateProfile(id, profileData);
	},
	{ revalidatePath: "/user/profile" },
);
