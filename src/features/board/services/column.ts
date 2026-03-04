/** @format */

import prisma from "@/lib/prisma";
import { Prisma } from "@g/prisma/client";

export type ColumnType = Prisma.ColumnGetPayload<{
  include: { tasks: true };
}>;

export const columnService = {
  // ------------------------------------------------------------------------------------------
  get: async () => {
    return await prisma.column.findMany({
      orderBy: { order: "asc" },
      include: {
        tasks: {
          orderBy: { order: "asc" },
        },
      },
    });
  },
  // ------------------------------------------------------------------------------------------
  getById: async (id: string) => await prisma.column.findUnique({ where: { id } }),
  // ------------------------------------------------------------------------------------------
  create: async (boardId: string, title: string) => {
    return await prisma.$transaction(async (tx) => {
      const lastColumn = await tx.column.findFirst({
        where: { boardId },
        orderBy: { order: "desc" },
      });

      const newOrder = lastColumn ? lastColumn.order + 1000 : 1000;

      return tx.column.create({
        data: { title, order: newOrder, boardId },
      });
    });
  },
  // ------------------------------------------------------------------------------------------
  update: async (id: string, data: { title?: string }) => {
    return await prisma.column.update({
      where: { id },
      data,
    });
  },
  // ------------------------------------------------------------------------------------------
  reorder: async (id: string, newOrder: number) => {
    return prisma.column.update({
      where: { id },
      data: { order: newOrder },
    });
  },
  // ------------------------------------------------------------------------------------------
  delete: async (id: string) => {
    return prisma.column.delete({ where: { id } });
  },
};
