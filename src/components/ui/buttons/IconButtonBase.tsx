/** @format */
"use client";

import {
  CircularProgress,
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
  Tooltip,
  type TooltipProps,
} from "@mui/material";
import { type ReactNode } from "react";

export interface IconButtonBaseProps extends Omit<MuiIconButtonProps, "variant"> {
  icon: ReactNode;
  loading?: boolean;
  tooltip?: string;
  tooltipPlacement?: TooltipProps["placement"];
}

export const IconButtonBase = ({
  icon,
  loading = false,
  tooltip,
  tooltipPlacement = "top",
  color = "primary",
  size = "medium",
  sx,
  disabled,
  ...props
}: IconButtonBaseProps) => {
  const content = (
    <MuiIconButton
      disabled={loading || disabled}
      color={color}
      size={size}
      sx={{ p: "8px", ...sx }}
      {...props}
    >
      {loading ? (
        <CircularProgress
          size={size === "small" ? 20 : 24}
          color={color === "inherit" ? "inherit" : "primary"}
        />
      ) : (
        icon
      )}
    </MuiIconButton>
  );

  return tooltip ? (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <span>{content}</span>
    </Tooltip>
  ) : (
    content
  );
};
