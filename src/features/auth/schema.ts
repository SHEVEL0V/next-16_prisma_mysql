/** @format */

import { z } from "zod";

import type { AuthInput, RegisterInput } from "./services";

export interface RegisterInputT extends RegisterInput {
	confirmPassword: string;
}

const name = z.string().trim().min(4, "Ім'я занадто коротке");
const email = z.email("Некоректний формат email").min(1, "Email обов'язковий");
const password = z.string().min(6, "Пароль має бути не менше 6 символів");
const confirmPassword = z
	.string()
	.min(6, "Пароль має бути не менше 6 символів");

// Схема для входу (SignIn)
export const loginSchema: z.ZodType<AuthInput> = z.object({
	email,
	password,
});

// Схема для реєстрації (SignUp)
export const registerSchema: z.ZodType<RegisterInput> = z
	.object({
		name,
		email,
		password,
		confirmPassword,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Паролі не збігаються",
		path: ["confirmPassword"],
	});
