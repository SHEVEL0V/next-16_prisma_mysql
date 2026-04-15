/** @format */

import prisma from "@/lib/prisma";
import { Prisma } from "@g/prisma/client";

export type ColumnType = Prisma.ColumnGetPayload<{
  include: { tasks: true };
}>;

export const columnService = {
  // ------------------------------------------------------------------------------------------

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
  update: async (id: string, data: { title?: string; order?: number }) => {
    return await prisma.column.update({
      where: { id },
      data,
    });
  },
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  delete: async (id: string) => {
    return await prisma.$transaction(async (tx) => {
      const column = await tx.column.findUnique({
        where: { id },
        include: { _count: { select: { tasks: true } } },
      });
      if (column && column._count.tasks > 0) {
        throw new Error("Не можна видалити колонку, в якій є завдання.");
      }
      return tx.column.delete({ where: { id } });
    });
  },
};
