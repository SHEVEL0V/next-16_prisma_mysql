/** @format */

import prisma from "@/lib/prisma";
import type { Prisma } from "@g/prisma/client";

export const taskService = {
	// ------------------------------------------------------------------------------------------

	// ------------------------------------------------------------------------------------------
	getById: async (id: string) =>
		await prisma.task.findUnique({ where: { id } }),
	// ------------------------------------------------------------------------------------------
	create: async (columnId: string, title: string) => {
		return await prisma.$transaction(async (tx) => {
			const lastTask = await tx.task.findFirst({
				where: { columnId },
				orderBy: { order: "desc" },
			});
			const order = lastTask ? lastTask.order + 1000 : 1000;

			return tx.task.create({
				data: { title, columnId, order },
			});
		});
	},
	// ------------------------------------------------------------------------------------------
	update: async (taskId: string, data: Partial<Prisma.TaskUpdateInput>) => {
		return prisma.task.update({
			where: { id: taskId },
			data,
		});
	},
	// ------------------------------------------------------------------------------------------
	delete: async (id: string) => await prisma.task.delete({ where: { id } }),
	// ------------------------------------------------------------------------------------------
	reorder: async (id: string, order: number, columnId: string) => {
		return await prisma.task.update({
			where: { id },
			data: {
				order: order,
				columnId: columnId,
			},
		});
	},
	getAllInfo: async () => {
		return await prisma.task.findMany({
			include: {
				column: {
					include: {
						board: true,
					},
				},
			},
		});
	},
};
