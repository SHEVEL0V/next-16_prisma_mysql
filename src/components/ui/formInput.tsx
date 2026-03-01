/** @format */

import { Grid, TextField } from "@mui/material";

interface FormInputProps {
  field: { name: string; label: string; type: string; required?: boolean };
  error?: string[];
  disabled: boolean;
}

export function FormInput({ field, error, disabled }: FormInputProps) {
  const isDate = field.type === "date";

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        name={field.name}
        label={field.label}
        type={field.type}
        required={field.required !== false}
        disabled={disabled}
        error={!!error}
        helperText={error?.[0]}
        slotProps={{
          inputLabel: { shrink: isDate ? true : undefined },
        }}
      />
    </Grid>
  );
}
