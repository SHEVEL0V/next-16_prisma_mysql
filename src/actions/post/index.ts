/** @format */

import prisma from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { userId } from "../cookies";
import { revalidatePath } from "next/cache";
import { FormServerAction } from "@/types";

export type PostCreateInput = Omit<Prisma.PostCreateInput, "author" | "authorId">;

const getAllPost = async () =>
  await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

const createPost: FormServerAction = async (prevState, formData) => {
  "use server";
  try {
    const data = Object.fromEntries(formData.entries()) as unknown as PostCreateInput;

    await prisma.post.create({
      data: {
        ...data,
        authorId: await userId(),
      },
    });
    revalidatePath("/");
    return { message: "Пост створено успішно ✅", success: true };
  } catch (error) {
    console.error("Create error:", error);
    return { message: "Не вдалося створити пост ❌", success: false };
  }
};

const deleteById = async (id: string) => {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete error ❌:", error);
    return { success: false };
  }
};

export const actionPost = { getAllPost, createPost, deleteById };
