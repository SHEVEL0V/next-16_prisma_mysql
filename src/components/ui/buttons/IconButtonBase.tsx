/** @format */

"use client";

import React, { type MouseEvent, type ReactNode, memo } from "react";
import {
  CircularProgress,
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
  Tooltip,
} from "@mui/material";

export interface IconButtonBaseProps
  extends Omit<MuiIconButtonProps, "variant"> {
  /** Icon element to render */
  icon: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Position of tooltip */
  tooltipPlacement?: "top" | "right" | "bottom" | "left";
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Base Icon Button Component
 * Handles rendering of icon buttons with tooltip support
 */
export const IconButtonBase = memo(
  ({
    icon,
    loading = false,
    tooltip,
    tooltipPlacement = "top",
    color = "primary",
    size = "medium",
    sx,
    onClick,
    ...props
  }: IconButtonBaseProps) => {
    const iconButtonEl = (
      <MuiIconButton
        onClick={onClick}
        disabled={loading || props.disabled}
        color={color}
        size={size}
        sx={{
          p: "8px",
          ...sx,
        }}
        {...(props as MuiIconButtonProps)}
      >
        {loading ? (
          <CircularProgress
            size={24}
            color={color === "inherit" ? "inherit" : "primary"}
          />
        ) : (
          icon
        )}
      </MuiIconButton>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} placement={tooltipPlacement}>
          <span>{iconButtonEl}</span>
        </Tooltip>
      );
    }

    return iconButtonEl;
  },
);

IconButtonBase.displayName = "IconButtonBase";

export default IconButtonBase;
