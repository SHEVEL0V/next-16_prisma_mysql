/** @format */
"use server";
import { createSafeAction } from "@/utils/wrapperAction";

import { boardService } from "./services/board";
import { columnService } from "./services/column";
import { taskService } from "./services/task";
import {
  boardSchema,
  columnSchema,
  // reorderTaskSchema,
  deleteTaskSchema,
  deleteBoardSchema,
  updateBoardSchema,
  updateTaskSchema,
  createTaskSchema,
  updateColumnTitleSchema,
  updateColumnOrderSchema,
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

// ------------------------------------------------------------------------------------------

export const createColumnAction = createSafeAction(
  columnSchema,
  async ({ boardId, title }) => await columnService.create(boardId, title),
  { revalidatePath: (data) => `/board/${data.boardId}` },
);

export const updateColumnAction = createSafeAction(
  updateColumnTitleSchema,
  async ({ id, title }) => await columnService.update(id, { title }),
  { revalidatePath: "/" },
);

export const reorderColumnAction = createSafeAction(
  updateColumnOrderSchema,
  async ({ id, order }) => await columnService.update(id, { order: parseInt(order) }),
  { revalidatePath: (data) => `/board?id=${data.id}` },
);

// ------------------------------------------------------------------------------------------

export const createTaskAction = createSafeAction(
  createTaskSchema,
  async ({ columnId, title }) => await taskService.create(columnId, title),
  { revalidatePath: "/" },
);

export const updateTaskAction = createSafeAction(
  updateTaskSchema,
  async ({ id, title }) => await taskService.update(id, { title }),
  { revalidatePath: "/" },
);

// export const reorderTaskAction = createSafeAction(
//   reorderTaskSchema,
//   async ({ id, columnId, order }) => await taskService.reorder(id, order, columnId),
//   { revalidatePath: "/" },
// );
// ------------------------------------------------------------------------------------------
export const deleteTaskAction = createSafeAction(
  deleteTaskSchema,
  async ({ id }) => await taskService.delete(id),
  { revalidatePath: "/" },
);
