/** @format */

"use client";

import { useTransition } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TaskType } from "../types";
import { deleteTaskAction } from "../actions"; // Імпорт Action

interface TaskCardProps {
  task: TaskType;
  isDragging?: boolean;
}

export default function TaskCard({ task, isDragging = false }: TaskCardProps) {
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTaskAction(task.id);
    });
  };

  return (
    <Card
      elevation={isDragging ? 8 : 1}
      sx={{
        bgcolor: isDragging
          ? alpha(theme.palette.primary.main, 0.1)
          : alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(4px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: theme.transitions.create([
          "background-color",
          "box-shadow",
          "opacity",
        ]),
        position: "relative",

        // UX: Поява кнопки при ховері або фокусі
        "&:hover .delete-btn, &:focus-within .delete-btn": {
          opacity: 1,
        },

        // Стан завантаження
        opacity: isPending ? 0.6 : 1,
        pointerEvents: isPending ? "none" : "auto",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
        >
          {/* Priority Chip - умовно рендеримо якщо є */}
          {task.priority && (
            <Chip
              label={task.priority}
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                height: 18,
                fontSize: "0.6rem",
                pointerEvents: "none",
              }}
            />
          )}

          <IconButton
            className="delete-btn"
            size="small"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="delete task"
            sx={{
              opacity: { xs: 1, md: 0 }, // Завжди видно на тачах, ховаємо на десктопі
              transition: theme.transitions.create("opacity"),
              color: "error.light",
              "&:hover": {
                color: "error.main",
                bgcolor: alpha(theme.palette.error.main, 0.1),
              },
            }}
          >
            {isPending ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <DeleteOutlineIcon fontSize="small" />
            )}
          </IconButton>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            lineHeight: 1.4,
            mt: 0.5,
            wordBreak: "break-word",
          }}
        >
          {task.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
