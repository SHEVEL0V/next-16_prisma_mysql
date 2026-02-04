/** @format */
"use client";

import React, { useState, useTransition } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Місяць
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Сонце
import { toggleTheme } from "@/actions/theme";

export default function ButtonDarkMode() {
  // Використовуємо стан для миттєвої зміни іконки в браузері
  const [mode, setMode] = useState("light");
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    const newMode = mode === "dark" ? "light" : "dark";

    // 1. Оновлюємо UI миттєво
    setMode(newMode);

    // 2. Викликаємо Server Action для збереження в Cookies/DB
    startTransition(async () => {
      await toggleTheme();
    });
  };

  return (
    <Tooltip title={mode === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему"}>
      <IconButton
        onClick={handleToggle}
        disabled={isPending} // Вимикаємо під час запиту
        color="inherit"
        sx={{
          ml: 1,
          transition: "transform 0.5s ease",
          "&:hover": {
            transform: "rotate(45deg)",
            backgroundColor:
              mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
          },
        }}
      >
        {mode === "dark" ? (
          <Brightness7Icon sx={{ color: "#ffb74d" }} /> // Сонце для переходу на світлу
        ) : (
          <Brightness4Icon sx={{ color: "#1976d2" }} /> // Місяць для переходу на темну
        )}
      </IconButton>
    </Tooltip>
  );
}
