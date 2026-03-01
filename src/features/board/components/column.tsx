/** @format */

"use client";

import { Paper, Typography } from "@mui/material";

import TaskCard from "./cardTask";
import { ColumnType } from "../services/column";



export default function BoardColumn({
  column,
  boardId,
}: {
  column: ColumnType;
  boardId: string;
}) {
  return (
    <Paper
      className="glass-effect bordered"
      sx={{ p: 2, minWidth: 300, height: "fit-content" }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {column.title}
      </Typography>
      {/* Тут можна додати завдання */}
      {column.tasks.map((task) => (
        <TaskCard key={task.id} task={task} isDragging={false} />
      ))}
    </Paper>
  );
}
