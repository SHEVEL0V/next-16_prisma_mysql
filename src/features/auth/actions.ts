/** @format */
"use server";

import { loginSchema, registerSchema } from "./schema";
import { createSafeAction } from "@/utils/wrapperAction";
import { authService } from "./services";

export const registerAction = createSafeAction(
  registerSchema,
  async (data) => await authService.register(data),
  {
    revalidatePath: "/",
    redirectTo: (user) => `/user/${user.name}/menu`,
  },
);

export const loginAction = createSafeAction(
  loginSchema,
  async (data) => await authService.login(data),

  {
    revalidatePath: "/",
    redirectTo: (user) => `/user/${user.name}/menu`,
  },
);
