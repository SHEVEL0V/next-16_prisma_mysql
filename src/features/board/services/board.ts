/** @format */

import prisma from "@/lib/prisma";
import type { Prisma } from "@g/prisma/client";

/**
 * Board Service
 * Manages all board-related database operations including creation, retrieval, updates, and deletion
 */
export const boardService = {
	/**
	 * Get all boards for the current user, ordered by creation date (newest first)
	 * @returns Array of boards without nested data
	 */
	get: async () => {
		return prisma.board.findMany({
			orderBy: { createdAt: "desc" },
		});
	},

	/**
	 * Get a single board with all its columns and tasks
	 * Maintains order hierarchy and includes task assignees
	 * @param id - Board UUID
	 * @returns Board with nested columns and tasks, or null if not found
	 */
	getById: async (id: string) => {
		return prisma.board.findUnique({
			where: { id },
			include: {
				columns: {
					orderBy: { order: "asc" },
					include: {
						tasks: {
							orderBy: { order: "asc" },
							include: { assignees: true },
						},
					},
				},
			},
		});
	},

	/**
	 * Create a new board with default columns
	 * Automatically initializes "To Do", "In Progress", "Done" columns
	 * @param data - Board creation data (title, userId, etc.)
	 * @returns Newly created board with default columns
	 */
	create: async (data: Prisma.BoardCreateInput) => {
		return prisma.board.create({
			data: {
				...data,
				columns: {
					create: [
						{ title: "To Do", order: 1000 },
						{ title: "In Progress", order: 2000 },
						{ title: "Done", order: 3000 },
					],
				},
			},
		});
	},

	/**
	 * Update board title
	 * @param id - Board UUID
	 * @param data - Update payload with title
	 * @returns Updated board
	 */
	update: async (id: string, data: Prisma.BoardUpdateInput) => {
		return prisma.board.update({
			where: { id },
			data: { title: data.title },
		});
	},

	/**
	 * Delete board and all cascading data (columns, tasks)
	 * @param id - Board UUID
	 * @returns Deleted board data
	 */
	delete: async (id: string) => prisma.board.delete({ where: { id } }),
};
