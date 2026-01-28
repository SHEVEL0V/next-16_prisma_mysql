/** @format */
import type { Prisma } from "../../generated/prisma/client";
// action type
export type ActionState = {
  message: string;
  success?: boolean;
} | null;

export type ActionType = (
  prevState: ActionState,
  formData: FormData,
) => Promise<ActionState> | ActionState;

// field modal
export type FormField = {
  name: keyof Prisma.PostCreateInput;
  label: string;
  type: "text" | "date" | "number" | "email";
};
