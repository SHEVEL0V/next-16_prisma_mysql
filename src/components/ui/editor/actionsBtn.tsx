/** @format */
/** @format */
"use client";

import React from "react";
import { Box, Tooltip, IconButton, CircularProgress } from "@mui/material";
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

type EditorProps<T> = {
  isEditing: boolean;
  isPending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onDelete?: (formData: FormData) => void;
};

export default function EditorActions<T>({
  isEditing,
  isPending,
  onEdit,
  onCancel,
  onDelete,
}: EditorProps<T>) {
  if (isPending) return <CircularProgress size={20} sx={{ m: 1 }} />;

  return (
    <Box className="actions" sx={{ display: "flex", gap: 0.5, ml: 1 }}>
      {isEditing ? (
        <>
          <Tooltip title="Зберегти">
            <IconButton size="small" color="success" type="submit">
              <CheckIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Скасувати">
            <IconButton size="small" onClick={onCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Редагувати">
            <IconButton
              size="small"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Видалити">
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.preventDefault();
                onDelete?.(new FormData());
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
}
