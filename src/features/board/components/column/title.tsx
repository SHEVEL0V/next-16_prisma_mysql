/** @format */

"use client";

import { Box } from "@mui/material";
import EditableTextField from "@/components/ui/fields/editor";
import EditableTypography from "@/components/ui/fields/text";
import { useActionState, useEffect, useRef, useState } from "react";
import { updateColumnAction } from "../../actions";

interface BoardColumnProps {
  id: string;
  title: string;
}

export default function TitleColumn({ id, title }: BoardColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, isPending] = useActionState(updateColumnAction, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (!isPending) {
      formRef.current?.requestSubmit();
      setIsEditing(false);
    }
  };

  return (
    <Box
      component="form"
      ref={formRef}
      action={action}
      sx={{ mb: 2, textAlign: "center" }}
    >
      <input type="hidden" name="id" value={id} />
      {!isEditing ? (
        <EditableTypography
          value={title}
          isPending={isPending}
          handleToggleEdit={() => setIsEditing(true)}
        />
      ) : (
        <EditableTextField
          formRef={formRef}
          name="title"
          defaultValue={title}
          handleToggleEdit={() => setIsEditing(false)}
          inputRef={inputRef}
          onBlur={handleBlur}
        />
      )}
    </Box>
  );
}
