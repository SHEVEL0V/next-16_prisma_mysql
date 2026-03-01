/** @format */

// action-response
export type ActionResponse<T> = {
  success: boolean;
  message?: string;
  data?: T | null;
  errors?: Record<string, string[]>; // Для помилок Zod (field-level)
};
