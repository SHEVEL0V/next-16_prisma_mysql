/** @format */
import z from "zod";
import { ActionResponse } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "./session";

interface ActionOptions<TOutput> {
  revalidatePath?: string | ((data: TOutput) => string);
  redirectTo?: string | ((data: TOutput) => string);
}

export function createSafeAction<TInput, TOutput>(
  schema: z.ZodSchema<TInput>,
  handler: (data: TInput, userId: string | undefined) => Promise<TOutput>,
  options?: ActionOptions<TOutput>,
) {
  return async (
    _prevState: ActionResponse<TOutput>,
    formData: FormData,
  ): Promise<ActionResponse<TOutput>> => {
    // 1. Отримання даних з FormData
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = schema.safeParse(rawData);

    // 2. Валідація
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;

      return {
        success: false,
        message: "Помилка валідації даних.",
        errors: fieldErrors as Record<string, string[]>,
      };
    }

    let result: TOutput;
    let shouldRedirect = false;
    let targetPath = "";

    try {
      const session = await getSession();
      const userId = session?.id;

      // Викликаємо основну логіку
      result = await handler(validatedFields.data, userId);

      // Revalidate (можна робити всередині try)
      if (options?.revalidatePath) {
        const path =
          typeof options.revalidatePath === "function"
            ? options.revalidatePath(result)
            : options.revalidatePath;
        revalidatePath(path);
      }

      // Готуємо редирект
      if (options?.redirectTo) {
        targetPath =
          typeof options.redirectTo === "function"
            ? options.redirectTo(result)
            : options.redirectTo;
        shouldRedirect = true;
      }
    } catch (error: any) {
      // Якщо це внутрішній редирект Next.js — прокидаємо далі
      if (error.digest?.includes("NEXT_REDIRECT") || error.message === "NEXT_REDIRECT") {
        throw error;
      }

      console.error("Action Error:", error);

      // Обробка специфічних помилок БД (наприклад, Prisma)
      if (error.code === "P2002") {
        return {
          success: false,
          message: "Запис із такими даними вже існує.",
          errors: {},
        };
      }

      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Сталася непередбачувана помилка.",
        errors: {},
      };
    }

    // 3. Виконуємо редирект ПОЗА try/catch блоком
    if (shouldRedirect && targetPath) {
      redirect(targetPath);
    }

    return {
      success: true,
      message: "Операція успішна",
      data: result,
    };
  };
}
