/** @format */

"use client";

import { Paper, Typography, Stack, Box, alpha, useTheme } from "@mui/material";
import TaskCard from "./cardTask";
import TaskCreateForm from "./formTask";
import { ColumnType } from "../../services/column";
import TitleColumn from "./title";

interface BoardColumnProps {
  column: ColumnType;
  boardId: string;
}

export default function BoardColumn({ column, boardId }: BoardColumnProps) {
  const theme = useTheme();

  return (
    <Paper
      className="glass-effect bordered"
      sx={{
        p: 2,
        minWidth: 320,
        width: 320,
        height: "fit-content",
        maxHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: alpha(theme.palette.background.default, 0.4),
        borderRadius: 3,
      }}
    >
      {/* Заголовок колонки */}
      <TitleColumn id={column.id} title={column.title} />

      {/* Форма винесена в окремий клієнтський компонент */}
      <TaskCreateForm columnId={column.id} boardId={boardId} />

      {/* Список завдань зі скролом */}
      <Stack
        spacing={1.5}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          pr: 0.5,
          minHeight: 20, // Щоб було куди кидати завдання при Drag-n-Drop
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: alpha(theme.palette.divider, 0.2),
            borderRadius: 2,
          },
        }}
      >
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {column.tasks.length === 0 && (
          <Box
            sx={{
              py: 4,
              border: "1px dashed",
              borderColor: alpha(theme.palette.divider, 0.2),
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Немає завдань
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
