/** @format */
import type { Prisma } from "../../generated/prisma/client";
// action type
export type ActionState = { message: string; success: boolean } | null;
export type ServerAction<T> = (prevState: T, formData: FormData) => Promise<T> | T;
export type FormServerAction = ServerAction<ActionState>;

// field modal
export type FormFieldConfig<T> = {
  name: keyof T;
  label: string;
  type: "text" | "date" | "number" | "email";
};

// type user
export type User = Prisma.UserModel;

// type post
export type FieldPost = FormFieldConfig<Partial<Prisma.PostCreateInput>>[];

export type FieldPostGet = Prisma.PostCreateInput;

export type FieldProfile = FormFieldConfig<Partial<Prisma.ProfileCreateInput>>[];
