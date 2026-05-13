// app/providers/MuiThemeClient.tsx
"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getThemeMui } from "@/theme";
import { useMemo } from "react";
import type { PaletteMode } from "@mui/material";

export default function MuiThemeClient({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: PaletteMode;
}) {
  const theme = useMemo(() => createTheme(getThemeMui(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
