/** @format */
"use client";

import { useActionState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import AddButton from "@/components/ui/AddButton";
import { createBoardAction } from "../../actions";

export default function CreateBoardForm({ isOpen }: { isOpen: boolean }) {
  const [state, formAction, isPending] = useActionState(createBoardAction, {
    success: false,
    errors: {},
  });

  return (
    <Box sx={{ p: 2 }}>
      <form
        action={formAction}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          justifyContent: isOpen ? "flex-start" : "center",
        }}
      >
        {isOpen && (
          <TextField
            name="title"
            size="small"
            placeholder="Нова дошка..."
            required
            fullWidth
            variant="outlined"
            // error={!!state.errors}
          />
        )}
        <AddButton isPending={isPending} title="Створити дошку" />
      </form>

      {isOpen && !state.success && state.message && (
        <Typography color="error" variant="caption" sx={{ ml: 1 }}>
          {state.message}
        </Typography>
      )}
    </Box>
  );
}
