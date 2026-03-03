/** @format */

import React from "react";
import { IconButton } from "@mui/material";

export default function IconBtn({
  children,
  color = "inherit",
  type = "button",
  ...props
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Додаємо типізацію для type
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
} & React.ComponentProps<typeof IconButton>) {
  return (
    <IconButton
      {...props}
      type={type}
      size="small"
      sx={{
        p: 0.5,
        opacity: 0.6,
        "&:hover": {
          opacity: 1,
          color: color === "inherit" ? "inherit" : `${color}.main`,
        },
        ...props.sx,
      }}
    >
      {children}
    </IconButton>
  );
}
