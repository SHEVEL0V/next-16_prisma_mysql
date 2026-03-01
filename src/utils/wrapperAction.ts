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
    //----------------------------------------------------------------------
    const rawData = Object.fromEntries(formData.entries());

    const validatedFields = schema.safeParse(rawData);

    if (!validatedFields.success) {
      const flatErrors = validatedFields.error.flatten((issue) => issue.message);

      console.warn("Validation Errors:", validatedFields.error.message);

      return {
        success: false,
        message: "Помилка валідації даних.",
        errors: flatErrors.fieldErrors as ActionResponse<TOutput>["errors"],
      };
    }

    let result: TOutput;

    try {
      const userId = (await getSession())?.id;
      result = await handler(validatedFields.data, userId);

      if (options?.revalidatePath) {
        const path =
          typeof options.revalidatePath === "function"
            ? options.revalidatePath(result)
            : options.revalidatePath;
        revalidatePath(path);
      }
    } catch (error: unknown) {
      // Якщо в самому handler був викликаний redirect() — прокидаємо його далі
      //   if (isRedirectError(error)) throw error;

      console.error("Action Error:", error);

      // Обробка помилок бази даних (Prisma)
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        return {
          success: false,
          message: "Такий запис уже існує в базі даних.",
        };
      }

      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Сталася непередбачувана помилка.",
      };
    }

    // 4. Динамічний редирект (має бути поза try/catch)
    if (options?.redirectTo) {
      const target =
        typeof options.redirectTo === "function"
          ? options.redirectTo(result)
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
