/** @format */
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSession } from "@/utils/session";
import { User } from "../../../generated/prisma/client";

// Виносимо сіль (salt rounds) у константу
const SALT_ROUNDS = 10;

// Визначаємо типи для вхідних даних
export type AuthInput = Pick<User, "email" | "password">;
export type RegisterInput = Pick<User, "name" | "email" | "password">;

export const authService = {
	login: async (data: AuthInput) => {
		const user = await prisma.user.findUnique({
			where: { email: data.email },
		});

		const isPasswordValid = user
			? await bcrypt.compare(data.password, user.password)
			: await bcrypt.compare(data.password, "fake_hash");

		if (!user || !isPasswordValid) {
			throw new Error("Невірний email або пароль");
		}

		await createSession(user);

		// Видаляємо пароль перед поверненням
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},

	register: async (data: RegisterInput) => {
		// Перевіряємо наявність користувача
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
			select: { id: true }, // Оптимізація: запитуємо тільки ID
		});

		if (existingUser) {
			throw new Error("Користувач з таким email вже існує");
		}

		// Асинхронний хеш не блокує потік виконання
		const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			},
		});

		await createSession(user);
		// Видаляємо пароль перед поверненням
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},
};
