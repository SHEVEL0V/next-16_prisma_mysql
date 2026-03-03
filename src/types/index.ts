/** @format */

// action-response
export type ActionResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; message?: string; errors: Record<string, string[]> };

export type ActionType<T> = (
  _prevState: ActionResponse<T>,
  formData: FormData,
) => Promise<ActionResponse<T>>;
