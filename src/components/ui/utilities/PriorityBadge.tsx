/** @format */

"use client";

import React from "react";
import { Chip, Box, useTheme, type ChipProps } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

interface PriorityBadgeProps {
  priority: PriorityLevel;
  variant?: "filled" | "outlined";
  size?: "small" | "medium";
  showIcon?: boolean;
}

/**
 * Priority Badge Component
 * Displays task priority with color-coded styling
 */
export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  variant = "filled",
  size = "medium",
  showIcon = true,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const priorityConfig: Record<
    PriorityLevel,
    {
      label: string;
      color: ChipProps["color"];
      bgColor: string;
      textColor: string;
    }
  > = {
    LOW: {
      label: "Low",
      color: "default",
      bgColor: isDark ? "#0f766e" : "#d1fae5",
      textColor: isDark ? "#86efac" : "#065f46",
    },
    MEDIUM: {
      label: "Medium",
      color: "warning",
      bgColor: isDark ? "#78350f" : "#fef3c7",
      textColor: isDark ? "#fbbf24" : "#92400e",
    },
    HIGH: {
      label: "High",
      color: "error",
      bgColor: isDark ? "#7c2d12" : "#fee2e2",
      textColor: isDark ? "#fb7185" : "#991b1b",
    },
    URGENT: {
      label: "Urgent",
      color: "error",
      bgColor: isDark ? "#831843" : "#fce7f3",
      textColor: isDark ? "#f472b6" : "#be185d",
    },
  };

  const config = priorityConfig[priority];

  return (
    <Chip
      label={config.label}
      icon={showIcon ? <FlagIcon /> : undefined}
      variant={variant}
      size={size}
      sx={{
        backgroundColor:
          variant === "filled" ? config.bgColor : "transparent",
        color: config.textColor,
        border:
          variant === "outlined" ? `1.5px solid ${config.textColor}` : "none",
        fontWeight: 600,
        fontSize: size === "small" ? "0.75rem" : "0.875rem",
        "& .MuiChip-icon": {
          color: config.textColor,
          fontSize: size === "small" ? "1rem" : "1.25rem",
        },
      }}
    />
  );
};

export default PriorityBadge;
