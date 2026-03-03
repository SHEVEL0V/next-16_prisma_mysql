/** @format */

import prisma from "@/lib/prisma";
import { Prisma } from "@g/prisma/client";

export const boardService = {
  get: async () => {
    return prisma.board.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  getById: async (id: string) => {
    return prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            tasks: {
              orderBy: { order: "asc" },
              include: { assignees: true },
            },
          },
        },
      },
    });
  },

  create: async (data: Prisma.BoardCreateInput) => {
    return prisma.board.create({
      data: {
        ...data,
        columns: {
          create: [
            { title: "To Do", order: 1000 },
            { title: "In Progress", order: 2000 },
            { title: "Done", order: 3000 },
          ],
        },
      },
    });
  },
  update: async (id: string, data: Prisma.BoardUpdateInput) => {
    return prisma.board.update({
      where: { id },
      data: { title: data.title },
    });
  },
  delete: async (id: string) => prisma.board.delete({ where: { id } }),
};
