/** @format */
"use client";
import React, { useActionState, useState, useCallback } from "react";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import IconBtn from "@/components/ui/buttons/icon";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditField from "@/components/ui/fields/edit";
import type { ActionType } from "@/types/index";

interface EditorProps<T> {
  data: { id: string; value: string; name: string };
  update: ActionType<T>;
  remove: ActionType<T>;
}

export default function Editor<T>({
  data: { id, name, value },
  update,
  remove,
}: EditorProps<T>) {
  const [isEditing, setIsEditing] = useState(false);

  const [stateUpdate, actionUpdate, isPendingUpdate] = useActionState(update, {
    success: false,
    errors: {},
  });

  const [stateDelete, actionDelete, isPendingDelete] = useActionState(remove, {
    success: false,
    errors: {},
  });

  const isPending = isPendingUpdate || isPendingDelete;

  // Використовуємо useCallback для стабільності пропсів
  const handleToggleEdit = useCallback((state: boolean) => {
    setIsEditing(state);
  }, []);

  const handleUpdate = async (formData: FormData) => {
    // Якщо значення не змінилося, просто виходимо з режиму редагування
    if (formData.get(name) === value) {
      setIsEditing(false);
      return;
    }
    await actionUpdate(formData);
    setIsEditing(false);
  };

  return (
    <Box
      component="form"
      action={handleUpdate}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: 56, // Трохи збільшено для стабільності Layout
        px: 1,
        borderRadius: 1,
        transition: "all 0.2s",
        "&:hover": { bgcolor: "action.hover" },
        "& .action-buttons": { opacity: isEditing || isPending ? 1 : 0 },
        "&:hover .action-buttons": { opacity: 1 },
      }}
    >
      <input type="hidden" name="id" value={id} />

      <EditField
        data={{
          value,
          name,
          error: stateUpdate.success ? undefined : stateUpdate?.errors?.[name]?.[0],
        }}
        isEditing={isEditing}
        isPending={isPending}
        onCancel={() => handleToggleEdit(false)}
        onEdit={() => handleToggleEdit(true)}
      />

      <Box
        className="action-buttons"
        sx={{
          display: "flex",
          gap: 0.5,
          ml: 1,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {isPending ? (
          <CircularProgress size={20} sx={{ m: 1 }} />
        ) : (
          <>
            {!isEditing ? (
              <>
                <Tooltip title="Редагувати">
                  <IconBtn
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleEdit(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconBtn>
                </Tooltip>

                <Tooltip title="Видалити">
                  <IconBtn type="submit" color="error" formAction={actionDelete}>
                    <DeleteIcon fontSize="small" />
                  </IconBtn>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Зберегти">
                  <IconBtn type="submit" color="success">
                    <CheckIcon fontSize="small" />
                  </IconBtn>
                </Tooltip>

                <Tooltip title="Скасувати">
                  <IconBtn
                    color="inherit"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleEdit(false);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconBtn>
                </Tooltip>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
