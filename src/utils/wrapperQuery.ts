/** @format */

// lib/safe-query.ts

type Success<T> = { data: T; error: null };
type Failure = { data: null; error: string };
type Result<T> = Success<T> | Failure;

export async function safeQuery<T>(
	queryFn: () => Promise<T>,
): Promise<Result<T>> {
	try {
		const data = await queryFn();
		return { data, error: null };
	} catch (error) {
		console.error("DAL Error Log:", error);
		// Тут можна інтегрувати Sentry або інший логер
		return {
			data: null,
			error: error instanceof Error ? error.message : "Internal Server Error",
		};
	}
}
