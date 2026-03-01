/** @format */
"use server";
import { postSchema } from "./schema";
import { createSafeAction } from "@/utils/wrapperAction";
import { postService } from "./services";

export const postCreateAction = createSafeAction(
  postSchema,
  async (data, userId) => {
    if (!userId) {
      throw new Error("User ID is required to create a post");
    }
    return await postService.create(data, userId);
  },
  {
    revalidatePath: "/",
  },
);
