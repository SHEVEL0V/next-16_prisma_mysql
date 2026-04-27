/** @format */

import prisma from "@/lib/prisma";

/**
 * Column Service
 * Handles column operations within boards (create, read, update, delete, reorder)
 */
export const columnService = {
	/**
	 * Get column by ID
	 * @param id - Column UUID
	 * @returns Column data without tasks
	 */
	getById: async (id: string) =>
		await prisma.column.findUnique({ where: { id } }),

	/**
	 * Create new column with automatic ordering
	 * Assigns order value 1000 units higher than last column
	 * @param boardId - Parent board UUID
	 * @param title - Column title
	 * @returns Newly created column with calculated order
	 */
	create: async (boardId: string, title: string) => {
		return await prisma.$transaction(async (tx) => {
			// Get last column to calculate next order value
			const lastColumn = await tx.column.findFirst({
				where: { boardId },
				orderBy: { order: "desc" },
			});

			const newOrder = lastColumn ? lastColumn.order + 1000 : 1000;

			return tx.column.create({
				data: { title, order: newOrder, boardId },
			});
		});
	},

	/**
	 * Update column title or order
	 * @param id - Column UUID
	 * @param data - Update payload (title, order)
	 * @returns Updated column
	 */
	update: async (id: string, data: { title?: string; order?: number }) => {
		return await prisma.column.update({
			where: { id },
			data,
		});
	},

	/**
	 * Delete column with validation
	 * Prevents deletion if column contains tasks
	 * @param id - Column UUID
	 * @throws Error if column has tasks
	 * @returns Deleted column data
	 */
	delete: async (id: string) => {
		return await prisma.$transaction(async (tx) => {
			const column = await tx.column.findUnique({
				where: { id },
				include: { _count: { select: { tasks: true } } },
			});

			// Prevent deletion of non-empty columns
			if (column && column._count.tasks > 0) {
				throw new Error("Cannot delete column with tasks");
			}

			return tx.column.delete({ where: { id } });
		});
	},
};
