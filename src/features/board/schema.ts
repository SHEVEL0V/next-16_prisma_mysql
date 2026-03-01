/** @format */

import z from "zod";

export const boardSchema = z.object({
  title: z.string().min(1, "Назва обов'язкова").max(50),
  description: z.string().max(255).optional(),
});

export const columnSchema = z.object({
  title: z.string().min(1, "Назва обов'язкова"),
  boardId: z.uuid(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Завдання не може бути порожнім"),
  columnId: z.uuid(),
  boardId: z.uuid().optional(),
});

export const reorderTaskSchema = z.object({
  id: z.uuid(),
  columnId: z.uuid(),
  order: z.number(),
  boardId: z.uuid().optional(),
});
