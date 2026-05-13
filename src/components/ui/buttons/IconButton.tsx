/** @format */
"use client";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButtonBase, type IconButtonBaseProps } from "./IconButtonBase";

export type IconVariant = "add" | "back" | "close" | "home" | "more" | "darkMode";

export interface IconButtonProps extends Omit<IconButtonBaseProps, "icon"> {
  variant: IconVariant;
  themeMode?: "light" | "dark";
}

export const IconButton = ({
  variant,
  loading,
  themeMode = "light",
  ...props
}: IconButtonProps) => {

  // Map variants to icons
  const getIcon = (value: string) => {
    switch (value) {
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

  return (
    <IconButtonBase
      {...props}
      icon={getIcon(variant)}
      loading={loading}
      color={variant === "add" ? "primary" : "inherit"}
    />
  );
};
