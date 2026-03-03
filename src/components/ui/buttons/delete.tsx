/** @format */
"use client";

import React, { useActionState, useState, useRef } from "react";
import {
  IconButton,
  CircularProgress,
  alpha,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { ActionType } from "@/types/index";

export default function DeleteButton<T>({
  id,
  action,
}: {
  id: string;
  action: ActionType<T>;
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    errors: {},
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => !isPending && setOpen(false);

  const handleConfirm = () => {
    // Програмно викликаємо відправку форми
    formRef.current?.requestSubmit();
  };

  // Закриваємо діалог автоматично після успішного видалення
  React.useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <form action={formAction} ref={formRef} style={{ display: "none" }}>
        <input type="hidden" name="id" value={id} />
      </form>

      <IconButton
        onClick={handleOpen}
        size="small"
        disabled={isPending}
        sx={{
          opacity: 0.7,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            opacity: 1,
            color: "error.main",
            bgcolor: (t) => alpha(t.palette.error.main, 0.08),
            transform: "scale(1.1)",
          },
        }}
      >
        {isPending ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <DeleteOutlineIcon fontSize="small" />
        )}
      </IconButton>

      {/* Діалог підтвердження */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="delete-dialog-title">
        <DialogTitle id="delete-dialog-title">Підтвердіть видалення</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ви впевнені, що хочете видалити цей елемент? Цю дію неможливо буде скасувати.
          </DialogContentText>
          {!state.success && state.message && (
            <Typography color="error" variant="caption" sx={{ mt: 2, display: "block" }}>
              {state.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            disabled={isPending}
            variant="outlined"
            color="inherit"
          >
            Скасувати
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            variant="contained"
            color="error"
            autoFocus
            startIcon={isPending && <CircularProgress size={14} color="inherit" />}
          >
            {isPending ? "Видалення..." : "Видалити"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
