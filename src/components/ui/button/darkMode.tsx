/** @format */
"use client";

import React from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

// MUI компоненти
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// MUI іконки
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Місяць
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Сонце

export default function ButtonDarkMode() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <Tooltip title={isDarkMode ? "Увімкнути світлу тему" : "Увімкнути темну тему"}>
      <IconButton
        onClick={() => toggleDarkMode()}
        color="inherit"
        sx={{
          ml: 1, // margin-left для відступу від сусідніх елементів
          transition: "transform 0.4s ease-in-out", // Плавна анімація обертання
          "&:hover": {
            transform: "rotate(180deg)", // Ефект при наведенні
            backgroundColor: isDarkMode ? "grey.800" : "grey.200",
          },
        }}
      >
        {/* Логіка відображення: 
            Якщо темна тема -> показуємо Місяць (або Сонце, залежно від того, 
            чи хочете ви показати "поточний стан" чи "дію").
            
            Варіант нижче показує ПОТОЧНИЙ стан (як у вашому коді):
            Dark = Місяць, Light = Сонце.
        */}
        {isDarkMode ? (
          <Brightness4Icon sx={{ color: "yellow.400" }} /> // Жовтий місяць
        ) : (
          <Brightness7Icon sx={{ color: "orange.500" }} /> // Помаранчеве сонце
        )}
      </IconButton>
    </Tooltip>
  );
}
