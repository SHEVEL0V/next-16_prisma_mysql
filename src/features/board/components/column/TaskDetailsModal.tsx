"use client";
import { useEffect, useActionState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TaskType } from "../../types";
import { updateTaskDetailsAction } from "../../actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default function TaskDetailsModal({ 
  open, 
  onClose, 
  task 
}: { 
  open: boolean; 
  onClose: () => void; 
  task: TaskType 
}) {
  const [state, formAction, isPending] = useActionState(updateTaskDetailsAction, {
    success: false,
    errors: {}
  });

  useEffect(() => {
    if (state.success && !isPending) {
      onClose();
    }
  }, [state.success, isPending, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
         Деталі завдання
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" action={formAction} id={`task-modal-${task.id}`} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <input type="hidden" name="id" value={task.id} />
          
          <TextField
            name="title"
            label="Назва завдання"
            defaultValue={task.title}
            fullWidth
            required
            error={"errors" in state && !!state.errors?.title}
            helperText={"errors" in state ? state.errors?.title?.[0] : undefined}
          />
          
          <TextField
            name="description"
            label="Опис завдання"
            defaultValue={task.description || ""}
            fullWidth
            multiline
            rows={6}
            error={"errors" in state && !!state.errors?.description}
            helperText={"errors" in state ? state.errors?.description?.[0] : undefined}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isPending}>
          Отмена
        </Button>
        <SubmitButton 
          form={`task-modal-${task.id}`}
          isPending={isPending}
          label="Зберегти"
          loadingText="Збереження..."
        />
      </DialogActions>
    </Dialog>
  );
}
