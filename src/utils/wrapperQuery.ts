/** @format */

/**
 * Safe Query Wrapper
 * Wraps async queries with error handling and standardized result format
 * Prevents unhandled promise rejections and provides consistent error messages
 */

/**
 * Success result type with data
 */
type Success<T> = { data: T; error: null };

/**
 * Failure result type with error message
 */
type Failure = { data: null; error: string };

/**
 * Result union type - either Success or Failure, never both
 */
type Result<T> = Success<T> | Failure;

/**
 * Execute async query function with automatic error handling
 * Returns standardized result object with either data or error
 * 
 * @template T - Type of data returned by query function
 * @param queryFn - Async function that executes the query
 * @returns Result object with data or error message
 * 
 * @example
 * const result = await safeQuery(() => prisma.user.findUnique(...))
 * if (result.error) console.error(result.error)
 * else console.log(result.data)
 */
export async function safeQuery<T>(
	queryFn: () => Promise<T>,
): Promise<Result<T>> {
	try {
		const data = await queryFn();
		return { data, error: null };
	} catch (error) {
		console.error("Query execution failed:", error);
		// Can be integrated with Sentry or other error tracking service
		return {
			data: null,
			error: error instanceof Error ? error.message : "Internal server error",
		};
	}
}
