/** @format */

import prisma from "@/lib/prisma";

/**
 * User Service
 * Handles user profile updates and related operations
 */
export const userService = {
	/**
	 * Update user profile information
	 * Creates or updates profile in transaction for data consistency
	 * @param userId - User UUID
	 * @param data - Profile update data (name, position, bio, image)
	 * @returns Updated profile object
	 */
	updateProfile: async (
		userId: string,
		data: { name: string; position: string; bio?: string; image?: string },
	) => {
		return await prisma.$transaction(async (tx) => {
			// Update user name
			await tx.user.update({
				where: { id: userId },
				data: { name: data.name },
			});

			// Upsert profile (create if not exists, update if exists)
			const profile = await tx.profile.upsert({
				where: { userId },
				update: {
					position: data.position,
					bio: data.bio || null,
					image: data.image || null,
				},
				create: {
					userId,
					position: data.position,
					bio: data.bio || null,
					image: data.image || null,
				},
			});

			return profile;
		});
	},
};
