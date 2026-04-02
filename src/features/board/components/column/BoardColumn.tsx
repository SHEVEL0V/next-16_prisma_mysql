/** @format */

"use client";

import { memo } from "react";
import { Paper, Typography, Stack, Box, alpha, useTheme } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import TaskCreateForm from "./TaskForm";
import { ColumnType } from "../../services/column";
import TitleColumn from "./ColumnTitle";

interface BoardColumnProps {
  column: ColumnType;
  boardId: string;
}

export default memo(function BoardColumn({ column, boardId }: BoardColumnProps) {
  const theme = useTheme();

  return (
    <Paper
      variant="boardColumn"
      className="glass-effect bordered"
    >
      {/* Заголовок колонки */}
      <TitleColumn id={column.id} title={column.title} />

      {/* Форма винесена в окремий клієнтський компонент */}
      <TaskCreateForm columnId={column.id} boardId={boardId} />

      {/* Список завдань зі скролом */}
      <Droppable droppableId={column.id} type="task">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={1.5}
            sx={{
              overflowY: "auto",
              overflowX: "hidden",
              pr: 0.5,
              minHeight: 20, // Щоб було куди кидати завдання при Drag-n-Drop
            }}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}

            {provided.placeholder}

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
        )}
      </Droppable>
    </Paper>
  );
});
