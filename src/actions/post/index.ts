/** @format */
import { ActionType } from "@/types";
import { db_Post, PostInput } from "./db";
import { revalidatePath } from "next/cache";

const getPostFields = (formData: FormData): PostInput =>
  Object.fromEntries(formData.entries()) as unknown as PostInput;

const getPost = async () => {
  try {
    const res = await db_Post.get();
    console.log("🟢 Getting posts success");
    return res;
  } catch (err) {
    console.error("🔴 Getting posts error =>", (err as Error).message);
    return [];
  }
};

const createPost: ActionType = async (prevState, formData) => {
  "use server";

  try {
    const data = getPostFields(formData);

    const dob = new Date(data.dateOfBirth);

    const fixedData: PostInput = {
      ...data,
      dateOfBirth: dob,
    };

    await db_Post.create(fixedData);
    console.log("🟢 Post created successfully");

    revalidatePath("/");

    return { message: "Пост успішно створено!", success: true };
  } catch (err) {
    console.error("🔴 Error creating post:", (err as Error).message);
    return {
      message: "Помилка при створенні.",
      success: false,
    };
  }
};

export const actionPost = { get: getPost, create: createPost };
