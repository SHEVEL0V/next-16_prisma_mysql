/** @format */
import React, { useRef, useEffect } from "react";
import { TextField, Typography, Stack, FormHelperText } from "@mui/material";

interface Props {
  data: { value: string; name: string; error?: string };
  isEditing?: boolean;
  isPending?: boolean;
  onCancel: () => void;
  onEdit: () => void;
}

export default function EditField({
  data,
  isEditing,
  isPending,
  onCancel,
  onEdit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Автоматичне виділення тексту при вході в режим редагування
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  const triggerSubmit = () => {
    // Використовуємо setTimeout, щоб дати можливість спрацювати onClick на кнопках (напр. "Скасувати")
    // перед тим, як відбудеться автоматичний сабміт по onBlur
    setTimeout(() => {
      const form = inputRef.current?.closest("form");
      if (form && isEditing && !isPending) {
        form.requestSubmit();
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = inputRef.current?.closest("form");
      form?.requestSubmit();
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <Stack direction="column" sx={{ width: "100%", flexGrow: 1 }}>
      {isEditing ? (
        <>
          <TextField
            inputRef={inputRef}
            name={data.name}
            fullWidth
            autoFocus
            variant="standard"
            defaultValue={data.value}
            onKeyDown={handleKeyDown}
            onBlur={triggerSubmit}
            error={Boolean(data.error)}
            disabled={isPending}
            autoComplete="off"
            slotProps={{
              input: {
                sx: { fontSize: "0.875rem", fontWeight: 500, pb: 0.5 },
              },
            }}
          />
          {data.error && (
            <FormHelperText
              error
              sx={{ m: 0, fontSize: "0.7rem", position: "absolute", bottom: -18 }}
            >
              {data.error}
            </FormHelperText>
          )}
        </>
      ) : (
        <Typography
          variant="body2"
          onClick={!isPending ? onEdit : undefined}
          sx={{
            fontWeight: 500,
            py: 0.5,
            color: isPending ? "text.disabled" : "text.primary",
            cursor: isPending ? "default" : "pointer",
            transition: "color 0.2s",
            "&:hover": { color: isPending ? "text.disabled" : "primary.main" },
            // Обрізка тексту
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data.value}
        </Typography>
      )}
    </Stack>
  );
}
