/** @format */

"use client";

import { useActionState, useRef, useEffect } from "react";
import { TextField, IconButton, Box, Typography, alpha, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createTaskAction } from "../../actions";

interface TaskCreateFormProps {
  columnId: string;
  boardId: string;
}

export default function TaskCreateForm({ columnId, boardId }: TaskCreateFormProps) {
  const theme = useTheme();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, actionCreate, isPending] = useActionState(createTaskAction, {
    success: false,
    errors: {},
  });

  // Очищення інпуту після успішного створення завдання
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Box component="form" action={actionCreate} ref={formRef} sx={{ mb: 2, px: 0.5 }}>
      {/* Приховані дані для екшену */}
      <input type="hidden" name="columnId" value={columnId} />
      <input type="hidden" name="boardId" value={boardId} />

      <TextField
        name="title"
        placeholder="Додати завдання..."
        fullWidth
        size="small"
        disabled={isPending}
        required
        autoComplete="off"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                type="submit"
                size="small"
                disabled={isPending}
                sx={{ color: "primary.main" }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            ),
            sx: {
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              fontSize: "0.875rem",
              borderRadius: 2,
            },
          },
        }}
      />
      {!state.success && state.message && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 0.5, ml: 1, display: "block" }}
        >
          {state.message}
        </Typography>
      )}
    </Box>
  );
}
