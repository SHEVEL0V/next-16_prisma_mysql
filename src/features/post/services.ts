/** @format */
import prisma from "@/lib/prisma";
import { PostInput } from "./schema"; // Імпортуємо тип із Zod

export const postService = {
  get: async () => {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create: async (data: PostInput, userId: string) => {
    console.log("Creating post with data:", data, "for user ID:", userId);
    return await prisma.post.create({
      data: {
        ...data,
        author: {
          connect: { id: userId },
        },
      },
    });
  },
};
