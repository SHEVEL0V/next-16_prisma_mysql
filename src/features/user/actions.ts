/** @format */
"use server";
import { createSafeAction } from "@/utils/wrapperAction";
import { updateProfileSchema } from "./schema";
import { userService } from "./services";

export const updateProfileAction = createSafeAction(
  updateProfileSchema,
  async (data) => {
    const { id, ...profileData } = data;
    return await userService.updateProfile(id, profileData);
  },
  { revalidatePath: "/user/profile" }
);
