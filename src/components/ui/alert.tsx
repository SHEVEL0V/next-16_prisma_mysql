/** @format */

import { Alert, Box } from "@mui/material";

interface FormAlertProps {
  message?: string;
  success?: boolean;
}

export function FormAlert({ message, success }: FormAlertProps) {
  if (!message) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={success ? "success" : "error"} sx={{ borderRadius: 2 }}>
        {message}
      </Alert>
    </Box>
  );
}
