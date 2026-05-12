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
import { type MouseEvent } from "react";
import { IconButtonBase, type IconButtonBaseProps } from "./IconButtonBase";

export type IconVariant = "add" | "back" | "close" | "home" | "more" | "darkMode";

export interface IconButtonProps extends Omit<IconButtonBaseProps, "icon"> {
  variant: IconVariant;
  onBack?: () => void;
  onHome?: () => void;
  onThemeToggle?: (isDark: boolean) => void;
  themeMode?: "light" | "dark";
}

export const IconButton = ({
  variant,
  loading,
  onBack,
  onHome,
  onThemeToggle,
  themeMode = "light",
  onClick,
  ...props
}: IconButtonProps) => {
  const router = useRouter();

  const getIcon = () => {
    switch (variant) {
      case "add": return <AddBoxIcon fontSize="large" />;
      case "back": return <ArrowBackIcon />;
      case "close": return <CloseIcon />;
      case "home": return <HomeIcon />;
      case "more": return <MoreVertIcon />;
      case "darkMode": return themeMode === "dark" ? <Brightness7Icon sx={{ color: "#ffb74d" }} /> : <Brightness4Icon sx={{ color: "#1976d2" }} />;
      default: return null;
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (variant === "back") onBack?.() ?? router.back();
    else if (variant === "home") onHome?.() ?? router.push("/");
    else if (variant === "darkMode") { e.preventDefault(); onThemeToggle?.(themeMode === "light"); }
  };

  return (
    <IconButtonBase
      {...props}
      icon={getIcon()}
      loading={loading}
      color={variant === "add" ? "primary" : "inherit"}
      onClick={handleClick}
    />
  );
};
