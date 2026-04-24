/** @format */
import prisma from "@/lib/prisma";

export const userService = {
	updateProfile: async (
		userId: string,
		data: { name: string; position: string; bio?: string; image?: string },
	) => {
		return await prisma.$transaction(async (tx) => {
			// Оновлюємо ім'я у моделі User
			await tx.user.update({
				where: { id: userId },
				data: { name: data.name },
			});

			// Перезаписуємо дані профілю
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
