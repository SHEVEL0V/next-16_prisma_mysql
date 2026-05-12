/** @format */
"use client";

import { CircularProgress, Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";

export type TextButtonVariant = "primary" | "secondary" | "submit";

export interface TextButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant: TextButtonVariant;
  loading?: boolean;
  loadingText?: string;
}

export const TextButton = ({
  variant,
  loading = false,
  loadingText,
  children,
  disabled,
  sx,
  ...props
}: TextButtonProps) => {
  const isSubmit = variant === "submit";
  const isSecondary = variant === "secondary";

  return (
    <MuiButton
      disabled={loading || disabled}
      variant={isSecondary ? "outlined" : "contained"}
      sx={{
        textTransform: "none",
        ...(isSubmit && { mt: 1, height: 52, fontSize: "1.05rem", fontWeight: 600, borderRadius: 2 }),
        ...sx,
      }}
      {...(isSubmit && { type: "submit", fullWidth: true, size: "large", disableElevation: true })}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={isSubmit ? 24 : 20} color="inherit" sx={{ mr: isSubmit ? 1.5 : 1 }} />
          {loadingText || (isSubmit ? "Loading..." : null)}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};
