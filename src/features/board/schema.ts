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

export const updateColumnTitleSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "Завдання не може бути порожнім"),
});

export const reorderSchema = z.object({
  id: z.uuid(),
  type: z.enum(["column", "task"]),
  order: z.string(),
  columnId: z.uuid().optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, "Завдання не може бути порожнім"),
  columnId: z.uuid(),
  boardId: z.uuid().optional(),
});

export const updateTaskSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "Завдання не може бути порожнім"),
});

export const updateBoardSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "Назва обов'язкова"),
});

export const deleteTaskSchema = z.object({ id: z.uuid() });

export const deleteColumnSchema = z.object({ id: z.uuid() });

export const deleteBoardSchema = z.object({ id: z.uuid() });
