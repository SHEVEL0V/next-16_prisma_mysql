/** @format */
"use client";
import { createTheme, PaletteMode, alpha, Theme } from "@mui/material";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const COLORS = {
  dark: { primary: "#3b82f6", background: "#0f172a", paper: "#1e293b" },
  light: { primary: "#2563eb", background: "#f8fafc", paper: "#ffffff" },
};

// --- КОНСТАНТИ РОЗМІРІВ ---
const DRAWER_WIDTH = 240;
const HEADER_HEIGHT = 70;
const FOOTER_HEIGHT = 80;

const getGlobalStyles = (theme: Theme, mode: PaletteMode) => ({
  "html, body": {
    height: "100%",
  },
  body: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },

  // Гнучкий контейнер для контенту
  main: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // ВІДСТУП ВІД ХЕДЕРА:
    paddingTop: `${HEADER_HEIGHT}px`,
  },

  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: `${HEADER_HEIGHT}px`,
    zIndex: theme.zIndex.appBar,
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid",
    borderColor: alpha(theme.palette.divider, 0.1),
  },

  footer: {
    flexShrink: 0,
    marginTop: "auto",
    width: "100%",
    minHeight: `${FOOTER_HEIGHT}px`,
    borderTop: "1px solid",
    borderColor: alpha(theme.palette.divider, 0.1),
    padding: theme.spacing(2, 0),
  },

  ".glass-effect": {
    backgroundColor: alpha(theme.palette.background.paper, 0.4),
    backdropFilter: "blur(12px)",
  },
  ".bordered": {
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    borderRadius: theme.shape.borderRadius,
  },
});

export const getTheme = (mode: PaletteMode) => {
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  return createTheme({
    palette: {
      mode,
      primary: { main: colors.primary, contrastText: "#fff" },
      background: { default: colors.background, paper: colors.paper },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => getGlobalStyles(theme, mode),
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: "10px",
            "&:active": { transform: "scale(0.97)" },
          },
        },
      },
    },
  });
};
