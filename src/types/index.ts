/** @format */
// action type
export type ActionState = {
  message: string;
  success?: boolean;
} | null;

export type ActionType = (
  prevState: ActionState,
  formData: FormData,
) => Promise<ActionState> | ActionState;
