/**
 * Date formatting utilities
 */

/**
 * Format date to DD.MM.YYYY format
 *
 * @param date - Date to format
 * @returns Formatted date string in DD.MM.YYYY format
 */
export function formatDate(date: Date | string): string {
	const newDate = new Date(date);

	if (isNaN(newDate.getTime())) {
		return "Invalid date";
	}

	const day = String(newDate.getDate()).padStart(2, "0");
	const month = String(newDate.getMonth() + 1).padStart(2, "0");
	const year = newDate.getFullYear();

	return `${day}.${month}.${year}`;
}

/**
 * Format date to DD.MM.YYYY HH:MM format
 *
 * @param date - Date to format
 * @returns Formatted date string with time
 */
export function formatDateTime(date: Date | string): string {
	const newDate = new Date(date);

	if (isNaN(newDate.getTime())) {
		return "Invalid date";
	}

	const day = String(newDate.getDate()).padStart(2, "0");
	const month = String(newDate.getMonth() + 1).padStart(2, "0");
	const year = newDate.getFullYear();
	const hours = String(newDate.getHours()).padStart(2, "0");
	const minutes = String(newDate.getMinutes()).padStart(2, "0");

	return `${day}.${month}.${year} ${hours}:${minutes}`;
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 *
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string): string {
	const newDate = new Date(date);

	if (isNaN(newDate.getTime())) {
		return "Invalid date";
	}

	const now = new Date();
	const diffMs = now.getTime() - newDate.getTime();
	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffSeconds < 60) {
		return "Just now";
	}

	if (diffMinutes < 60) {
		return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
	}

	if (diffHours < 24) {
		return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
	}

	if (diffDays < 7) {
		return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
	}

	return formatDate(newDate);
}
