/** @format */

import { getTasksAll } from "@/features/board/queries";
import { Box } from "@mui/material";
import { formatDate } from "@/utils/formatDate";
import { TasksClient } from "./TasksClient";
import type { TaskRow } from "./TasksClient";

/**
 * Tasks Page
 * Server component that fetches tasks and passes to client component
 */
export default async function Tasks() {
	const result = await getTasksAll();
	const tasks = result.data || [];

	const rows: TaskRow[] = tasks.map((task) => ({
		id: task.id,
		date: formatDate(task.createdAt),
		status: task.column.title,
		title: task.title,
		description: task.description,
		board_title: task.column.board.title,
		priority: task.priority,
	}));

	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<TasksClient rows={rows} />
		</Box>
	);
}
