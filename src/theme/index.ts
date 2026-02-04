/** @format */
"use client";

import { createTheme, PaletteMode } from "@mui/material";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const getTheme = (mode: PaletteMode) => {
  return createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      button: {
        textTransform: "none", // Сучасний стиль: без капсу на кнопках
        fontWeight: 500,
      },
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // --- LIGHT MODE ---
            primary: {
              main: "#2563eb", // Більш сучасний "яскравий синій" (Tailwind style)
              contrastText: "#fff",
            },
            secondary: {
              main: "#7c3aed", // Сучасний фіолетовий
            },
            background: {
              default: "#f8fafc", // Не чисто білий, а ледь сірий (Slate 50) для глибини
              paper: "#ffffff",
            },
            text: {
              primary: "#1e293b", // Slate 800 - м'якше ніж чисто чорний
              secondary: "#64748b",
            },
          }
        : {
            // --- DARK MODE ---
            primary: {
              main: "#3b82f6", // Трохи світліший синій для темного фону
            },
            secondary: {
              main: "#8b5cf6",
            },
            background: {
              default: "#0f172a", // Глибокий темно-синій (Slate 900), виглядає дорожче за #121212
              paper: "#1e293b", // Slate 800
            },
            text: {
              primary: "#f1f5f9",
              secondary: "#94a3b8",
            },
          }),
    },
    shape: {
      borderRadius: 12, // Більш заокруглені кути для карток та інпутів (тренд 2024-2025)
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, // Кнопки трохи менш круглі ніж картки
            padding: "8px 16px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none", // Flat design
            },
          },
          containedPrimary: {
             "&:hover": {
                backgroundColor: mode === "light" ? "#1d4ed8" : "#2563eb",
             }
          }
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === "light"
                ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" // Soft shadow
                : "none", // У темній темі тіні часто прибирають або роблять дуже слабкими
            border: mode === "dark" ? "1px solid #334155" : "none",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          size: "small", // Більш компактні інпути
        },
      },
    },
  });
};