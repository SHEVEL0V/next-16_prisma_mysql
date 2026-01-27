/** @format */

import prisma from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { userId } from "../cookies";

export type PostInput = Omit<Prisma.PostCreateInput, "user" | "userId">;

export const db_Post = {
  // Get all posts
  get: async () => await prisma.post.findMany(),
  //  Add a new post
  create: async (postInput: PostInput) =>
    prisma.post.create({
      data: {
        ...postInput,
        userId: Number(await userId()),
      },
    }),
  // Delete by id
  delete: async (id: number) => prisma.post.delete({ where: { id } }),
};
