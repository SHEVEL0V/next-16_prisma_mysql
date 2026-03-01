/** @format */
"use server";
import { createSafeAction } from "@/utils/wrapperAction";
import { revalidatePath } from "next/cache";

import { boardService } from "./services/board";
import { columnService } from "./services/column";
import { taskService } from "./services/task";
import { boardSchema, columnSchema, taskSchema, reorderTaskSchema } from "./schema";

export const createBoardAction = createSafeAction(
  boardSchema,
  async (data) => await boardService.create(data),
  { revalidatePath: "/" },
);

export const createColumnAction = createSafeAction(
  columnSchema,
  async ({ boardId, title }) => {
    const column = await columnService.create(boardId, title);
    revalidatePath(`/board/${boardId}`);
    return column;
  },
);

export const createTaskAction = createSafeAction(
  taskSchema,
  async ({ columnId, title, boardId }) => {
    const task = await taskService.create(columnId, title);
    if (boardId) revalidatePath(`/board/${boardId}`);
    return task;
  },
);

export const reorderTaskAction = createSafeAction(
  reorderTaskSchema,
  async ({ id, columnId, order, boardId }) => {
    const updatedTask = await taskService.update(id, { columnId, order });
    if (boardId) revalidatePath(`/board/${boardId}`);
    return updatedTask;
  },
);
// ------------------------------------------------------------------------------------------
export const deleteTaskAction = async (id: string) => {
  try {
    await taskService.delete(id);
    revalidatePath(`/board`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { message: "Failed to delete task" };
  }
};
