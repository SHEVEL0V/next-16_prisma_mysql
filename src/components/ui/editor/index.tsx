/** @format */
import { Box } from "@mui/material";
import { useActionState, useState, useRef, useEffect, useMemo } from "react";
import type { ActionType } from "@/types/index";
import EditorActions from "@/components/ui/editor/actionsBtn";
import ErrorMessage from "@/components/ui/editor/message";
import EditableTypography from "@/components/ui/fields/text";
import EditableTextField from "../fields/editor";

interface EditorProps<T> {
  data: { id: string; value: string; name: string };
  update: ActionType<T>;
  remove: ActionType<T>;
  children?: React.ReactNode;
}

export default function InlineEditor<T>({
  data: { id, name, value },
  update,
  remove,
  children,
}: EditorProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [stateUpdate, actionUpdate, isPendingUpdate] = useActionState(update, {
    success: false,
    errors: {},
  });

  const [, actionDelete, isPendingDelete] = useActionState(remove, {
    success: false,
    errors: {},
  });

  const isPending = isPendingUpdate || isPendingDelete;

  const fieldError = useMemo(
    () => (!stateUpdate.success ? stateUpdate.errors?.[name]?.[0] : null),
    [stateUpdate, name],
  );

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleBlur = (e: React.FocusEvent) => {
    if (formRef.current?.contains(e.relatedTarget as Node)) return;
    if (isEditing && !isPending) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        mb: 1,
        borderRadius: 1,
        transition: "background-color 0.2s",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          minHeight: 40,
        }}
      >
        {children}

        <Box
          sx={{
            ml: "auto",
            opacity: isEditing ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
            ".editor-group:hover &": {
              opacity: 1,
            },
            ...(isPending && { opacity: 1 }),
          }}
        >
          <EditorActions
            isEditing={isEditing}
            isPending={isPending}
            onEdit={() => setIsEditing(true)}
            onCancel={() => setIsEditing(false)}
            id={id}
            actionDelete={actionDelete}
          />
        </Box>
      </Box>

      <Box
        ref={formRef}
        component="form"
        action={(formData) => {
          actionUpdate(formData);
          if (stateUpdate.success) setIsEditing(false);
        }}
        onBlur={handleBlur}
        sx={{
          px: 1.5,
          pb: 1,
          width: "100%",
        }}
      >
        <input type="hidden" name="id" value={id} />

        <Box sx={{ position: "relative", minHeight: 32 }}>
          {isEditing ? (
            <>
              <EditableTextField
                name={name}
                defaultValue={value}
                inputRef={inputRef}
                formRef={formRef}
                disabled={isPending}
                handleToggleEdit={setIsEditing}
              />
              {fieldError && <ErrorMessage message={fieldError} />}
            </>
          ) : (
            <EditableTypography
              value={value}
              isPending={isPending}
              handleToggleEdit={() => setIsEditing(true)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
