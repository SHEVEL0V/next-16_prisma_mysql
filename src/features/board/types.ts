/** @format */

import type { Prisma } from "@g/prisma/client";

export type BoardType = Prisma.BoardGetPayload<{
	include: { columns: { include: { tasks: true } } };
}>;

export type ColumnType = Prisma.ColumnGetPayload<{
	include: { tasks: true };
}>;

export type TaskType = Prisma.TaskGetPayload<null>;
