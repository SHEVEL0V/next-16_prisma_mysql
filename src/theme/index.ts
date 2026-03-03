/** @format */
"use client";

import { createTheme, PaletteMode, alpha } from "@mui/material";
import { Roboto } from "next/font/google";
import { DESIGN_TOKENS } from "./constants";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface Theme {
    custom: typeof DESIGN_TOKENS;
  }
  interface ThemeOptions {
    custom?: typeof DESIGN_TOKENS;
  }
}

export const getTheme = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  return createTheme({
    cssVariables: {
      colorSchemeSelector: "class", // Дозволяє зручно перемикати теми через клас
    },
    palette: {
      mode,
      primary: {
        main: isDark ? "#60a5fa" : "#2563eb", // Трохи м'якші кольори для dark mode
        contrastText: "#fff",
      },
      background: {
        default: isDark ? "#0f172a" : "#f8fafc",
        paper: isDark ? "#1e293b" : "#ffffff",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: DESIGN_TOKENS.borderRadius },
    custom: DESIGN_TOKENS,

    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          "html, body": {
            height: "100%",
            margin: 0,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          body: {
            backgroundColor: theme.palette.background.default,
            transition: theme.transitions.create("background-color", { duration: 300 }),
          },
          ".glass-effect": {
            backgroundColor: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          },
        }),
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            height: DESIGN_TOKENS.headerHeight,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
          }),
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            padding: "8px 16px",
            transition: theme.transitions.create(
              ["transform", "background-color", "box-shadow"],
              {
                duration: 200,
              },
            ),
            "&:active": { transform: "scale(0.96)" },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            borderRadius: Number(theme.shape.borderRadius) * 2,
            border: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create([
              "box-shadow",
              "border-color",
              "transform",
            ]),
            "&:hover": {
              boxShadow: isDark ? "0 8px 24px -8px rgba(0,0,0,0.5)" : theme.shadows[3],
              borderColor: alpha(theme.palette.primary.main, 0.3),
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
};
