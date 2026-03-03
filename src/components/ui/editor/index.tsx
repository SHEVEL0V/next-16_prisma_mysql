/** @format */
import { Box, Typography, TextField } from "@mui/material";
import { useActionState, useState, useRef, useEffect, useCallback } from "react";
import type { ActionType } from "@/types/index";
import EditorActions from "@/components/ui/editor/actionsBtn";
import ErrorMessage from "@/components/ui/editor/message";

interface EditorProps<T> {
  data: { id: string; value: string; name: string };
  update: ActionType<T>;
  remove: ActionType<T>;
}

export default function InlineEditor<T>({
  data: { id, name, value },
  update,
  remove,
}: EditorProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [stateUpdate, actionUpdate, isPendingUpdate] = useActionState(update, {
    success: false,
    errors: {},
  });
  const [stateDelete, actionDelete, isPendingDelete] = useActionState(remove, {
    success: false,
    errors: {},
  });

  const isPending = isPendingUpdate || isPendingDelete;
  const error = !stateUpdate.success ? stateUpdate?.errors?.[name]?.[0] : null;

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleToggleEdit = useCallback((state: boolean) => setIsEditing(state), []);

  const handleSubmit = async (formData: FormData) => {
    const newValue = formData.get(name);
    // Якщо значення не змінилося — просто закриваємо режим редагування
    if (newValue === value) {
      handleToggleEdit(false);
      return;
    }
    await actionUpdate(formData);
    setIsEditing(false);
  };

  // Функція для автоматичного сабміту при втраті фокусу
  const handleBlur = () => {
    if (isEditing && !isPending) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <Box
      ref={formRef}
      component="form"
      action={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: 48,
        px: 1.5,
        borderRadius: 1,
        transition: "background 0.2s",
        "&:hover": { bgcolor: isEditing ? "transparent" : "action.hover" },
        "& .actions": { opacity: isEditing || isPending ? 1 : 0 },
        "&:hover .actions": { opacity: 1 },
      }}
    >
      <input type="hidden" name="id" value={id} />

      <Box sx={{ flexGrow: 1, position: "relative" }}>
        {isEditing ? (
          <>
            <TextField
              inputRef={inputRef}
              name={name}
              fullWidth
              variant="standard"
              defaultValue={value}
              disabled={isPending}
              onBlur={handleBlur} // Збереження при виході
              onKeyDown={(e) => {
                if (e.key === "Escape") handleToggleEdit(false);
                if (e.key === "Enter") formRef.current?.requestSubmit(); // Збереження на Enter
              }}
              slotProps={{
                input: {
                  sx: { fontSize: "0.875rem", fontWeight: 500 },
                  disableUnderline: false,
                },
              }}
            />
            <ErrorMessage message={error} />
          </>
        ) : (
          <Typography
            variant="body2"
            onClick={() => !isPending && handleToggleEdit(true)}
            sx={{
              fontWeight: 500,
              cursor: isPending ? "default" : "pointer",
              color: isPending ? "text.disabled" : "text.primary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              "&:hover": { color: isPending ? "text.disabled" : "primary.main" },
            }}
          >
            {value}
          </Typography>
        )}
      </Box>

      <EditorActions
        isEditing={isEditing}
        isPending={isPending}
        onEdit={() => handleToggleEdit(true)}
        onCancel={() => handleToggleEdit(false)}
        onDelete={actionDelete}
      />
    </Box>
  );
}
