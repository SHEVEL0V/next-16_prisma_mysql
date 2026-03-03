/** @format */
"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FormInput } from "./fields/input";
import { FormAlert } from "./alert";
import { SubmitButton } from "./buttons/submit";
import type { ActionResponse } from "@/types";

interface ModalProps<T> {
  fields: { name: string; label: string; type: string; required?: boolean }[];
  title?: string;
  action: (
    prevState: ActionResponse<T>,
    formData: FormData,
  ) => Promise<ActionResponse<T>>;
}

export default function DynamicModal<T>({ fields, title, action }: ModalProps<T>) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    errors: {},
  });

  const handleClose = () => router.back();

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => handleClose(), 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
        <Typography variant="h6" fontWeight="bold">
          {title || "Заповніть форму"}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {state.message && <FormAlert message={state.message} success={state.success} />}

        <Box component="form" action={formAction} id="modal-form" noValidate>
          <Grid container spacing={2}>
            {fields.map((field) => (
              <FormInput
                key={field.name}
                field={field}
                disabled={isPending}
                error={
                  "errors" in state
                    ? state.errors?.[field.name as keyof typeof state.errors]
                    : undefined
                }
              />
            ))}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <SubmitButton
          isPending={isPending}
          label="Зберегти"
          loadingText="Збереження..."
          form="modal-form"
          sx={{ width: "auto", px: 4 }}
        />
      </DialogActions>
    </Dialog>
  );
}
