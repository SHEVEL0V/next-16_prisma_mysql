/** @format */
import { memo } from "react";
import { Grid, TextField, TextFieldProps } from "@mui/material";

interface FormInputProps extends Omit<TextFieldProps, "error" | "helperText"> {
  field: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
  };
  error?: string[];
  // Усі інші пропси (disabled, defaultValue, onChange тощо) потраплять у ...rest
}

export const FormInput = memo(({ field, error, ...rest }: FormInputProps) => {
  const { name, label, type = "text", required = true } = field;
  const isDate = ["date", "time", "datetime-local"].includes(type);

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        fullWidth
        name={name}
        label={label}
        type={type}
        required={required !== false}
        error={!!error?.length}
        helperText={error?.[0] || " "} // " " тримає місце, щоб верстка не "стрибала"
        // Використовуємо спред для всіх інших пропсів (disabled, multiline, і т.д.)
        {...rest}
        slotProps={{
          inputLabel: {
            shrink: isDate ? true : undefined,
          },
        }}
      />
    </Grid>
  );
});

FormInput.displayName = "FormInput";
