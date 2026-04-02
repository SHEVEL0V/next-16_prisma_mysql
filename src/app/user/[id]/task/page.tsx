/** @format */

import { Grid } from "@/components/ui/CustomDataGrid";
import { getTasksAll } from "@/features/board/queries";

export default async function Tasks() {
  const tasks = (await getTasksAll()).data || [];

  const parsDate = (date: Date) => {
    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const rows = tasks.map((task) => ({
    id: task.id,
    date: parsDate(task.createdAt),
    status: task.column.title,
    title: task.title,
    description: task.description,
    board_title: task.column.board.title,
    priority: task.priority,
  }));

  return <Grid data={rows} />;
}
