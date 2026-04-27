/** @format */

import prisma from "@/lib/prisma";
import type { Prisma } from "@g/prisma/client";

/**
 * Task Service
 * Manages task CRUD operations, ordering, and relationships with columns
 */
export const taskService = {
	/**
	 * Get task by ID
	 * @param id - Task UUID
	 * @returns Task data
	 */
	getById: async (id: string) =>
		await prisma.task.findUnique({ where: { id } }),

	/**
	 * Create new task in column with automatic ordering
	 * @param columnId - Target column UUID
	 * @param title - Task title
	 * @returns Newly created task with calculated order
	 */
	create: async (columnId: string, title: string) => {
		return await prisma.$transaction(async (tx) => {
			// Get last task in column for order calculation
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

	/**
	 * Update task properties
	 * @param taskId - Task UUID
	 * @param data - Update payload (title, description, priority, etc.)
	 * @returns Updated task
	 */
	update: async (taskId: string, data: Partial<Prisma.TaskUpdateInput>) => {
		return prisma.task.update({
			where: { id: taskId },
			data,
		});
	},

	/**
	 * Delete task by ID
	 * @param id - Task UUID
	 * @returns Deleted task data
	 */
	delete: async (id: string) => await prisma.task.delete({ where: { id } }),

	/**
	 * Reorder task to different position/column
	 * Updates both order and columnId for drag-and-drop operations
	 * @param id - Task UUID
	 * @param order - New order value
	 * @param columnId - Target column UUID
	 * @returns Updated task with new position
	 */
	reorder: async (id: string, order: number, columnId: string) => {
		return await prisma.task.update({
			where: { id },
			data: {
				order: order,
				columnId: columnId,
			},
		});
	},

	/**
	 * Get all tasks with full relationship data
	 * Used for data export or analytics
	 * @returns Array of tasks with nested column and board info
	 */
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
