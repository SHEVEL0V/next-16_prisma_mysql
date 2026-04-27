/** @format */

import type { Prisma } from "@g/prisma/client";

/**
 * Board Feature Types
 * Defines all type relationships and data structures for board management
 */

/**
 * Board type with all nested relationships
 * Includes columns and their tasks for complete board view
 */
export type BoardType = Prisma.BoardGetPayload<{
	include: { columns: { include: { tasks: true } } };
}>;

/**
 * Column type with tasks included
 * Used when rendering individual columns in the UI
 */
export type ColumnType = Prisma.ColumnGetPayload<{
	include: { tasks: true };
}>;

/**
 * Task type - base Prisma type for individual task
 * Used in UI components and forms
 */
export type TaskType = Prisma.TaskGetPayload<null>;

/**
 * Extract task type from column to ensure consistency
 * Represents a single task within a column's task array
 * Guarantees type safety when mapping column tasks
 */
export type ColumnTaskType = ColumnType["tasks"][number];
