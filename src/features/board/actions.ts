/** @format */
"use server";
import { createSafeAction } from "@/utils/wrapperAction";

import { boardService } from "./services/board";
import { columnService } from "./services/column";
import { taskService } from "./services/task";
import {
  boardSchema,
  columnSchema,
  reorderTaskSchema,
  deleteTaskSchema,
  deleteBoardSchema,
  updateBoardSchema,
  updateTaskSchema,
  createTaskSchema,
} from "./schema";

export const createBoardAction = createSafeAction(
  boardSchema,
  async (data) => await boardService.create(data),
  { revalidatePath: "/" },
);

export const updateBoardAction = createSafeAction(
  updateBoardSchema,
  async ({ id, ...data }) => await boardService.update(id, data),
  { revalidatePath: "/" },
);

export const deleteBoardAction = createSafeAction(
  deleteBoardSchema,
  async ({ id }) => await boardService.delete(id),
  { revalidatePath: "/" },
);

export const createColumnAction = createSafeAction(
  columnSchema,
  async ({ boardId, title }) => await columnService.create(boardId, title),
  { revalidatePath: (data) => `/board/${data.boardId}` },
);

export const createTaskAction = createSafeAction(
  createTaskSchema,
  async ({ columnId, title, boardId }) => await taskService.create(columnId, title),
  { revalidatePath: "/" },
);

export const updateTaskAction = createSafeAction(
  updateTaskSchema,
  async ({ id, title }) => await taskService.update(id, { title }),
  { revalidatePath: "/" },
);

export const reorderTaskAction = createSafeAction(
  reorderTaskSchema,
  async ({ id, columnId, order, boardId }) =>
    await taskService.update(id, { columnId, order }),
  { revalidatePath: "/" },
);
// ------------------------------------------------------------------------------------------
export const deleteTaskAction = createSafeAction(
  deleteTaskSchema,
  async ({ id }) => await taskService.delete(id),
  { revalidatePath: "/" },
);
