/** @format */

import z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "./session";

// 1. Оптимізовано тип помилок для кращого Developer Experience (DX)
export type ActionState<TInput, TOutput> =
	| {
			success: true;
			data: TOutput;
			message?: string;
	  }
	| {
			success: false;
			message?: string;
			errors: Partial<Record<keyof TInput, string[]>>;
	  };

interface ActionOptions<TInput, TOutput> {
	actionName?: string; // Додано для ідентифікації екшену в логах
	revalidatePath?: string | ((data: TOutput, input: TInput) => string);
	redirectTo?: string | ((data: TOutput, input: TInput) => string);
}

interface DatabaseError extends Error {
	code?: string;
	digest?: string;
}

// Утиліта для визначення системних помилок Next.js (redirect, notFound),
// які не можна перехоплювати в catch.
const isNextjsRoutingError = (error: unknown): boolean => {
	if (error instanceof Error) {
		return (
			error.message === "NEXT_REDIRECT" ||
			error.message === "NEXT_NOT_FOUND" ||
			(error as DatabaseError).digest?.startsWith("NEXT_REDIRECT") === true
		);
	}
	return false;
};

export function createSafeAction<TInput, TOutput>(
	schema: z.ZodSchema<TInput>,
	handler: (data: TInput, userId: string | undefined) => Promise<TOutput>,
	options?: ActionOptions<TInput, TOutput>,
) {
	return async (
		_prevState: ActionState<TInput, TOutput>,
		formData: FormData,
	): Promise<ActionState<TInput, TOutput>> => {
		const actionCtx = options?.actionName || "UnnamedAction";
		console.log(`[ACTION_START] [${actionCtx}] Ініціалізація...`);

		// 1. Валідація
		// Примітка: Object.fromEntries губить множинні значення (наприклад, масиви чекбоксів).
		// Якщо використовуєте масиви у формах, краще використовувати zod-form-data.
		const rawData = Object.fromEntries(formData.entries());
		const validatedFields = schema.safeParse(rawData);

		if (!validatedFields.success) {
			const fieldErrors = validatedFields.error.flatten()
				.fieldErrors as Partial<Record<keyof TInput, string[]>>;

			console.warn(`[ACTION_VALIDATION_ERROR] [${actionCtx}]`, {
				input: rawData,
				errors: fieldErrors,
			});

			return {
				success: false,
				message: "Помилка валідації даних.",
				errors: fieldErrors,
			};
		}

		const inputData = validatedFields.data;
		let result: TOutput;

		// 2. Виконання Handler'а
		try {
			const session = await getSession();
			result = await handler(inputData, session?.id);

			console.log(`[ACTION_SUCCESS] [${actionCtx}] Успішно виконано.`);

			if (options?.revalidatePath) {
				const path =
					typeof options.revalidatePath === "function"
						? options.revalidatePath(result, inputData)
						: options.revalidatePath;
				revalidatePath(path);
				console.log(
					`[ACTION_REVALIDATE] [${actionCtx}] Шлях оновлено: ${path}`,
				);
			}
		} catch (error: unknown) {
			// Пропускаємо Next.js Redirects/NotFounds, щоб фреймворк працював коректно
			if (isNextjsRoutingError(error)) {
				console.log(
					`[ACTION_ROUTING] [${actionCtx}] Перехоплено Next.js роутинг (redirect/notFound).`,
				);
				throw error;
			}

			const dbError = error as DatabaseError;

			// Обробка відомих помилок БД (напр. Prisma унікальність)
			if (dbError.code === "P2002") {
				console.warn(
					`[ACTION_DB_CONFLICT] [${actionCtx}] Конфлікт унікальності (P2002):`,
					{
						input: inputData,
						errorMessage: dbError.message,
					},
				);

				return {
					success: false,
					message: "Запис із такими даними вже існує.",
					errors: {},
				};
			}

			// Непередбачувані помилки
			console.error(`[ACTION_UNKNOWN_ERROR] [${actionCtx}] Критична помилка:`, {
				error: error instanceof Error ? error.stack : error,
				input: inputData,
			});

			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Сталася непередбачувана помилка.",
				errors: {},
			};
		}

		// 3. Редирект поза try/catch
		if (options?.redirectTo) {
			const target =
				typeof options.redirectTo === "function"
					? options.redirectTo(result, inputData)
					: options.redirectTo;

			console.log(
				`[ACTION_REDIRECT] [${actionCtx}] Виконується редирект на: ${target}`,
			);
			redirect(target);
		}

		return {
			success: true,
			message: "Операція успішна",
			data: result,
		};
	};
}
