/** @format */
/** @format */
"use client";

import React, { useTransition } from "react";
import { Box, Tooltip, IconButton, CircularProgress } from "@mui/material";
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

type EditorProps = {
  isEditing: boolean;
  isPending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  id: string;
  actionDelete: (formData: FormData) => void;
};

export default function EditorActions({
  isEditing,
  isPending,
  onEdit,
  onCancel,
  actionDelete,
  id,
}: EditorProps & { id: string }) {
  const [isDeleting, startDelete] = useTransition();
  const handelDelete = () =>
    startDelete(() => {
      if (confirm("Ви впевнені, що хочете видалити?")) {
        const formData = new FormData();
        formData.append("id", id);
        actionDelete(formData);
      }
    });

  if (isPending || isDeleting)
    return (
      <Box
        sx={{
          minHeight: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        <CircularProgress size={20} />
      </Box>
    );

  return (
    <Box
      className="actions"
      sx={{ minHeight: 40, display: "flex", gap: 0.5, ml: "auto" }}
    >
      {isEditing ? (
        <>
          {/* <Tooltip title="Зберегти">
            <IconButton size="small" color="success" type="submit">
              <CheckIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Скасувати">
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
            >
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
            <IconButton size="small" color="error" onClick={handelDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
}
