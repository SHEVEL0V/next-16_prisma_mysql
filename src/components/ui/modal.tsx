/** @format */

"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FormServerAction } from "@/types";

// MUI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save"; // Додамо іконку для збереження

interface ModalProps {
  fields: { name: string; label: string; type: string }[];
  title?: string;
  action: FormServerAction;
}

export default function Modal({ fields, title, action }: ModalProps) {
  const [state, actionForm, pending] = useActionState(action, null);
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  // Автоматичне закриття модалки при успіху (опціонально)
  useEffect(() => {
    if (state?.success) {
      // Можна додати затримку або закрити одразу
      // handleClose();
    }
  }, [state?.success]);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      // Додаємо анімацію появи (PaperProps - стандартний спосіб стилізації "картки" діалогу)
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      {/* 1. Заголовок + Абсолютно позиційована кнопка закриття */}
      <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {title || "Заповніть форму"}
        </Typography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Виводимо Alert зверху, якщо є помилка або успіх */}
        {state?.message && (
          <Box sx={{ mb: 2 }}>
            <Alert severity={state.success ? "success" : "error"} onClose={() => {}}>
              {state.message}
            </Alert>
          </Box>
        )}

        {/* Форма */}
        <Box
          component="form"
          action={actionForm}
          id="modal-form"
          noValidate
          autoComplete="off"
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            {fields.map((field, index) => {
              // Логіка для дат: якщо type="date", лейбл має бути завжди піднятий (shrink)
              const isDate = field.type === "date";

              return (
                <Grid
                  size={{ xs: 12, sm: 6 }} // sm краще ніж md для модалок
                  key={field.name}
                >
                  <TextField
                    margin="dense" // Трохи компактніший вигляд, стандарт для діалогів
                    id={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    fullWidth
                    required
                    variant="outlined"
                    // Спеціальні пропси для дати
                    slotProps={{
                      inputLabel: {
                        shrink: isDate ? true : undefined,
                      },
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} variant="text" color="inherit">
          Скасувати
        </Button>
        <Button
          type="submit"
          form="modal-form"
          variant="contained"
          disabled={pending}
          startIcon={
            pending ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />
          }
          disableElevation // Робить кнопку пласкою (сучасний тренд), приберіть якщо не подобається
        >
          {pending ? "Збереження..." : "Зберегти"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
