/** @format */

import prisma from "@/lib/prisma";

import { TaskCreateInput } from "../../../../generated/prisma/models";
import { Task } from "@g/prisma/client";

export type TaskType = Omit<Task, "createdAt" | "updatedAt">;
export type TaskCreateType = TaskCreateInput;

export const taskService = {
  // ------------------------------------------------------------------------------------------
  get: async () =>
    await prisma.task.findMany({
      orderBy: { order: "asc" },
    }),
  // ------------------------------------------------------------------------------------------
  getById: async (id: string) => await prisma.task.findUnique({ where: { id } }),
  // ------------------------------------------------------------------------------------------
  create: async (columnId: string, title: string) => {
    return await prisma.$transaction(async (tx) => {
      const lastTask = await tx.task.findFirst({
        where: { columnId },
        orderBy: { order: "desc" },
      });
      const order = lastTask ? lastTask.order + 1000 : 1000;

      return tx.task.create({
        data: { title, columnId, order },
      });
    });
  },
  // ------------------------------------------------------------------------------------------
  update: async (taskId: string, data: Partial<Task>) => {
    return prisma.task.update({
      where: { id: taskId },
      data: { title: data.title },
    });
  },
  // ------------------------------------------------------------------------------------------
  delete: async (id: string) => await prisma.task.delete({ where: { id } }),
  // ------------------------------------------------------------------------------------------
  reorder: async (taskId: string, newOrder: number, newColumnId: string) => {
    return await prisma.task.update({
      where: { id: taskId },
      data: {
        order: newOrder,
        columnId: newColumnId,
      },
    });
  },
};
