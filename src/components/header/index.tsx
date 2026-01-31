/** @format */
"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Ваші компоненти
import ButtonUser from "@/components/ui/button/user";
import ButtonDarkMode from "@/components/ui/button/darkMode";
import ButtonBack from "@/components/ui/button/back";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={2} // Трохи менша тінь для акуратності
      sx={{
        // Адаптивний колір фону
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.50",
        color: "text.primary", // Краще використовувати стандартний колір тексту
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between", // Розподіляє Ліво та Право по краях
          minHeight: { xs: 64, sm: 70 }, // Фіксована висота для стабільності
          px: { xs: 1, sm: 3 }, // Горизонтальні відступи
        }}
      >
        {/* === ЛІВА СЕКЦІЯ === */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1, // Відступ між кнопками (8px)
            zIndex: 10, // Щоб кнопки були поверх заголовка на малих екранах
          }}
        >
          <ButtonBack />
          <ButtonDarkMode />
        </Box>

        {/* === ЦЕНТРАЛЬНА СЕКЦІЯ (ЗАГОЛОВОК) === */}
        <Typography
          variant="h5" // Оптимальний розмір для Header
          component="h1"
          noWrap // Обрізає текст трьома крапками, якщо він не влізає
          sx={{
            fontWeight: 700,
            color: "success.main", // Ваш зелений колір
            textAlign: "center",

            // Логіка абсолютного центрування
            position: { xs: "static", md: "absolute" },
            left: { md: "50%" },
            transform: { md: "translateX(-50%)" },

            // Адаптивність розміру шрифту
            fontSize: { xs: "1.2rem", md: "1.5rem" },

            // Якщо на мобільному місця мало — заголовок посунеться,
            // а не налізе на кнопки
            flexGrow: { xs: 1, md: 0 },
            px: 2, // Відступ тексту від кнопок на мобільному
          }}
        >
          Welcome to UI
        </Typography>

        {/* === ПРАВА СЕКЦІЯ === */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            zIndex: 10,
          }}
        >
          <ButtonUser />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
