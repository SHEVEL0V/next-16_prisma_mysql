/** @format */

"use client";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import React, { type MouseEvent, memo, useCallback } from "react";
import IconButtonBase, {
  type IconButtonBaseProps,
} from "./IconButtonBase";

export type IconVariant = "add" | "back" | "close" | "home" | "more" | "darkMode";

export interface IconButtonProps extends Omit<IconButtonBaseProps, "icon"> {
  /** Icon button variant */
  variant: IconVariant;
  /** Callback for back button */
  onBack?: () => void;
  /** Callback for home button */
  onHome?: () => void;
  /** Callback for dark mode toggle */
  onThemeToggle?: (isDark: boolean) => void;
  /** Current theme mode */
  themeMode?: "light" | "dark";
}

/**
 * Icon Button Component
 * Handles all icon button variants (add, back, close, home, more, darkMode)
 */
export const IconButton = memo(
  ({
    variant,
    loading = false,
    tooltip,
    tooltipPlacement = "top",
    onBack,
    onHome,
    onThemeToggle,
    themeMode = "light",
    ...props
  }: IconButtonProps) => {
    const router = useRouter();

    // Handle back button click
    const handleBackClick = useCallback(() => {
      if (onBack) {
        onBack();
      } else {
        router.back();
      }
    }, [router, onBack]);

    // Handle home button click
    const handleHomeClick = useCallback(() => {
      if (onHome) {
        onHome();
      } else {
        router.push("/");
      }
    }, [router, onHome]);

    // Handle dark mode toggle
    const handleThemeToggle = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onThemeToggle) {
          // Pass the NEW theme mode (opposite of current)
          onThemeToggle(themeMode === "light");
        }
      },
      [themeMode, onThemeToggle],
    );

    // Generic click handler
    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        if (props.onClick && typeof props.onClick === "function") {
          props.onClick(e);
        }
      },
      [props],
    );

    // Render icon based on variant
    const getIcon = () => {
      switch (variant) {
        case "add":
          return <AddBoxIcon fontSize="large" />;
        case "back":
          return <ArrowBackIcon />;
        case "close":
          return <CloseIcon />;
        case "home":
          return <HomeIcon />;
        case "more":
          return <MoreVertIcon />;
        case "darkMode":
          return themeMode === "dark" ? (
            <Brightness7Icon sx={{ color: "#ffb74d" }} />
          ) : (
            <Brightness4Icon sx={{ color: "#1976d2" }} />
          );
        default:
          return null;
      }
    };

    // Get color based on variant
    const getColor = (): "primary" | "inherit" => {
      return variant === "add" ? "primary" : "inherit";
    };

    // Get click handler based on variant
    const getClickHandler = () => {
      switch (variant) {
        case "back":
          return handleBackClick;
        case "home":
          return handleHomeClick;
        case "darkMode":
          return handleThemeToggle;
        default:
          return handleClick;
      }
    };

    return (
      <IconButtonBase
        icon={getIcon()}
        loading={loading}
        tooltip={tooltip}
        tooltipPlacement={tooltipPlacement}
        color={getColor()}
        onClick={getClickHandler()}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
