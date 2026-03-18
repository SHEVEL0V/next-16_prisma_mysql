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

/**
 * Universal reordering action. Handles both columns and tasks within a given board.
 * Resolves optimal target coordinates and triggers backend mutation without duplicate states.
 */
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

// Reorder action combined above
// ------------------------------------------------------------------------------------------
export const deleteTaskAction = createSafeAction(
  deleteTaskSchema,
  async ({ id }) => await taskService.delete(id),
  { revalidatePath: "/" },
);
