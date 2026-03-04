/** @format */
import z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "./session";

// Витягуємо типи помилок безпосередньо зі схеми Zod
export type ActionState<TInput, TOutput> = {
  success?: boolean;
  message?: string;
  errors?: z.inferFlattenedErrors<z.ZodSchema<TInput>>["fieldErrors"];
  data?: TOutput;
};

interface ActionOptions<TInput, TOutput> {
  revalidatePath?: string | ((data: TOutput, input: TInput) => string);
  redirectTo?: string | ((data: TOutput, input: TInput) => string);
}

// Допоміжний тип для помилок бази даних (наприклад, Prisma)
interface DatabaseError extends Error {
  code?: string;
  digest?: string;
}

export function createSafeAction<TInput, TOutput>(
  schema: z.ZodSchema<TInput>,
  handler: (data: TInput, userId: string | undefined) => Promise<TOutput>,
  options?: ActionOptions<TInput, TOutput>,
) {
  return async (
    _prevState: ActionState<TInput, TOutput>,
    formData: FormData,
  ): Promise<ActionState<TInput, TOutput>> => {
    // 1. Валідація
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = schema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Помилка валідації даних.",
        // flatten() повертає правильну структуру fieldErrors
        errors: validatedFields.error.flatten().fieldErrors as ActionState<
          TInput,
          TOutput
        >["errors"],
      };
    }

    const inputData = validatedFields.data;
    let result: TOutput;

    try {
      const session = await getSession();
      result = await handler(inputData, session?.id);

      if (options?.revalidatePath) {
        const path =
          typeof options.revalidatePath === "function"
            ? options.revalidatePath(result, inputData)
            : options.revalidatePath;
        revalidatePath(path);
      }
    } catch (error: unknown) {
      // Обробка помилок через перевірку типів (Type Guarding)
      const dbError = error as DatabaseError;

      // Обов'язково для Next.js Redirects
      if (dbError?.digest?.includes("NEXT_REDIRECT")) {
        throw error;
      }

      console.error("[ACTION_ERROR]:", error);

      if (dbError.code === "P2002") {
        return {
          success: false,
          message: "Запис із такими даними вже існує.",
        };
      }

      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Сталася непередбачувана помилка.",
      };
    }

    // Редирект поза try/catch
    if (options?.redirectTo) {
      const target =
        typeof options.redirectTo === "function"
          ? options.redirectTo(result, inputData)
          : options.redirectTo;
      redirect(target);
    }

    return {
      success: true,
      message: "Операція успішна",
      data: result,
    };
  };
}
