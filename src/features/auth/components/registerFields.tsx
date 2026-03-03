/** @format */
import { TextField, Stack, Alert } from "@mui/material";
import { ActionResponse } from "@/types";
import { SubmitButton } from "@/components/ui/buttons/submit";

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

export function RegisterFields<T>({ state, isPending }: RegisterFieldsProps<T>) {
  return (
    <Stack spacing={2.5}>
      {FIELDS.map((field) => (
        <TextField
          key={field.id}
          fullWidth
          required
          disabled={isPending}
          error={!!state.errors?.[field.name as keyof typeof state.errors]}
          helperText={state.errors?.[field.name as keyof typeof state.errors]?.[0]}
          {...field}
        />
      ))}

      {!state.success && state.message && (
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          {state.message}
        </Alert>
      )}

      <SubmitButton
        isPending={isPending}
        label="Create Account"
        loadingText="Creating account..."
      />
    </Stack>
  );
}
