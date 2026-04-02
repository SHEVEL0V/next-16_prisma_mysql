/** @format */
"use client";
import React from "react";
import { TextField, TextFieldProps, IconButton, InputAdornment } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface EditableTextFieldProps {
  handleToggleEdit: (edit: boolean) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
}

export default function EditableTextField({
  handleToggleEdit,
  formRef,
  ...props
}: EditableTextFieldProps & TextFieldProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleToggleEdit(false);
    if (e.key === "Enter" && !props.multiline) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <TextField
      {...props}
      fullWidth
      variant="standard"
      onKeyDown={handleKeyDown}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => formRef.current?.requestSubmit()}>
                <CheckIcon fontSize="inherit" color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
