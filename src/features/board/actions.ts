/** @format */
"use server";
import { createSafeAction } from "@/utils/wrapperAction";

import { boardService } from "./services/board";
import { columnService } from "./services/column";
import { taskService } from "./services/task";
import {
  boardSchema,
  columnSchema,
  reorderSchema,
  deleteTaskSchema,
  deleteBoardSchema,
  updateBoardSchema,
  updateTaskSchema,
  createTaskSchema,
  updateColumnTitleSchema,
  updateTaskPrioritySchema,
  updateTaskDetailsSchema,
  deleteColumnSchema,
} from "./schema";

/**
 * Creates a new Kanban board.
 * @param data - The validated board title payload.
 */
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

export const deleteColumnAction = createSafeAction(
  deleteColumnSchema,
  async ({ id }) => await columnService.delete(id),
  { revalidatePath: "/" },
);

export const reorderAction = createSafeAction(
  reorderSchema,
  async ({ id, type, order, columnId }) => {
    if (type === "column") {
      return await columnService.update(id, { order: parseInt(order) });
    } else if (type === "task" && columnId) {
      return await taskService.reorder(id, parseInt(order), columnId);
    }
  },
  { revalidatePath: "/" },
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

export const updateTaskPriorityAction = createSafeAction(
  updateTaskPrioritySchema,
  async ({ id, priority }) => await taskService.update(id, { priority }),
  { revalidatePath: "/" },
);

export const updateTaskDetailsAction = createSafeAction(
  updateTaskDetailsSchema,
  async ({ id, title, description }) => await taskService.update(id, { title, description }),
  { revalidatePath: "/" },
);

// ------------------------------------------------------------------------------------------
export const deleteTaskAction = createSafeAction(
  deleteTaskSchema,
  async ({ id }) => await taskService.delete(id),
  { revalidatePath: "/" },
);
