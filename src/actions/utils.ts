/** @format */

import { ActionState } from "@/types";

export async function catchError(
  action: () => Promise<ActionState>,
): Promise<ActionState> {
  try {
    return await action();
  } catch (error) {
    console.error("❌ Action Error:", error);
    return {
      message: error instanceof Error ? error.message : "Невідома помилка сервера",
      success: false,
    };
  }
}
