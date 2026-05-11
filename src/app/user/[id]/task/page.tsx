/** @format */

import { getTasksAll } from "@/features/board/queries";
import { Box, Container } from "@mui/material";
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
		<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
			<Container
				maxWidth="xl"
				sx={{
					flex: 1,
					display: "flex",
					py: 2,
					px: { xs: 1, sm: 2, md: 3 },
				}}
			>
				<TasksClient rows={rows} />
			</Container>
		</Box>
	);
}
