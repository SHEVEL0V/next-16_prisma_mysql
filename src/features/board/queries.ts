/** @format */

/**
 * Board Server Queries
 * Safe server-side data fetching with automatic caching and error handling
 * All queries use React's cache() for per-request deduplication
 * and safeQuery wrapper for standardized error handling
 */

"use server";
import { cache } from "react";
import { safeQuery } from "@/utils/wrapperQuery";
import { boardService } from "./services/board";
import { taskService } from "./services/task";

/**
 * Get all boards for current user
 * Results are cached per request and ordered by creation date (newest first)
 * 
 * @query
 * @returns Promise<Result<Board[]>> - Either data array or error
 * @caching React cache() prevents duplicate queries in same render
 * 
 * @example
 * const result = await getBoards();
 * if (result.error) console.error(result.error);
 * else console.log(result.data);
 */
export const getBoards = cache(() => safeQuery(boardService.get));

/**
 * Get single board with all columns and tasks
 * Returns complete board structure with ordered columns and tasks
 * 
 * @query
 * @param id - Board UUID
 * @returns Promise<Result<Board>> - Either board data or error
 * @caching React cache() - cached for the request duration
 * 
 * @example
 * const result = await getBoardById(boardId);
 * if (!result.error) {
 *   // result.data is Board with columns and tasks
 * }
 */
export const getBoardById = cache((id: string) =>
	safeQuery(() => boardService.getById(id)),
);

/**
 * Get all tasks with complete relationship data
 * Includes nested column and board information for each task
 * Useful for analytics, exports, or cross-board operations
 * 
 * @query
 * @returns Promise<Result<Task[]>> - Array of tasks with relations or error
 * @caching React cache() - cached for the request duration
 * 
 * @example
 * const result = await getTasksAll();
 * if (!result.error) {
 *   result.data.forEach(task => {
 *     console.log(`Task: ${task.title} in Board: ${task.column.board.title}`);
 *   });
 * }
 */
export const getTasksAll = cache(() => safeQuery(taskService.getAllInfo));
