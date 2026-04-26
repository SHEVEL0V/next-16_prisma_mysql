/** @format */

import type { Prisma } from "@g/prisma/client";

// Board type with all nested relationships
export type BoardType = Prisma.BoardGetPayload<{
	include: { columns: { include: { tasks: true } } };
}>;

// Column type with tasks included
export type ColumnType = Prisma.ColumnGetPayload<{
	include: { tasks: true };
}>;

// Task type - base Prisma type without timestamps for UI operations
export type TaskType = Prisma.TaskGetPayload<null>;
