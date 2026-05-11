/** @format */

"use client";

import React, { type MouseEvent, memo } from "react";
import {
  CircularProgress,
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

export type TextButtonVariant = "primary" | "secondary" | "submit";

export interface TextButtonProps extends Omit<MuiButtonProps, "variant"> {
  /** Button style variant */
  variant: TextButtonVariant;
  /** Loading state */
  loading?: boolean;
  /** Text to display during loading */
  loadingText?: string;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Text Button Component
 * Handles rendering of text-based buttons (primary, secondary, submit)
 */
export const TextButton = memo(
  ({
    variant,
    loading = false,
    loadingText,
    children,
    onClick,
    sx,
    ...props
  }: TextButtonProps) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (onClick && typeof onClick === "function") {
        onClick(e);
      }
    };

    if (variant === "submit") {
      return (
        <MuiButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading || props.disabled}
          size="large"
          disableElevation
          sx={{
            mt: 1,
            height: 52,
            textTransform: "none",
            fontSize: "1.05rem",
            fontWeight: 600,
            borderRadius: 2,
            ...sx,
          }}
          onClick={handleClick}
          {...(props as MuiButtonProps)}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1.5 }} />
              {loadingText || "Loading..."}
            </>
          ) : (
            children
          )}
        </MuiButton>
      );
    }

    if (variant === "secondary") {
      return (
        <MuiButton
          variant="outlined"
          disabled={loading || props.disabled}
          sx={{
            textTransform: "none",
            ...sx,
          }}
          onClick={handleClick}
          {...(props as MuiButtonProps)}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              {loadingText}
            </>
          ) : (
            children
          )}
        </MuiButton>
      );
    }

    // primary (default)
    return (
      <MuiButton
        variant="contained"
        disabled={loading || props.disabled}
        sx={{
          textTransform: "none",
          ...sx,
        }}
        onClick={handleClick}
        {...(props as MuiButtonProps)}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            {loadingText}
          </>
        ) : (
          children
        )}
      </MuiButton>
    );
  },
);

TextButton.displayName = "TextButton";

export default TextButton;
