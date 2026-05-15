/** @format */

import { TextField, Stack, Alert } from "@mui/material";
import { Button } from "@/components/ui/buttons";
import { MESSAGES } from "@/constants";
import type { ActionResponse } from "@/types";

interface RegisterFieldsProps<T> {
  state: ActionResponse<T>;
  isPending: boolean;
}

const FIELDS = [
  {
    id: "name",
    name: "name",
    label: "Full Name",
    type: "text",
    autoComplete: "name",
    autoFocus: true,
  },
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "email",
    autoComplete: "email",
  },
  { id: "password", name: "password", label: "Password", type: "password" },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
] as const;

/**
 * RegisterFields Component
 * Renders registration form fields (name, email, password, confirmation)
 */
export default function RegisterFields<T>({ state, isPending }: RegisterFieldsProps<T>) {
  const errors = "errors" in state ? state.errors : undefined;

  return (
    <Stack spacing={2.5}>
      {FIELDS.map((field) => (
        <TextField
          key={field.id}
          fullWidth
          required
          disabled={isPending}
          error={!!errors?.[field.name as keyof typeof errors]}
          helperText={errors?.[field.name as keyof typeof errors]?.[0]}
          {...field}
        />
      ))}

      {!state.success && state.message && (
        <Alert severity="error" variant="filled">
          {state.message}
        </Alert>
      )}

      <Button variant="submit" loading={isPending} loadingText={MESSAGES.loading}>
        {MESSAGES.register}
      </Button>
    </Stack>
  );
}
