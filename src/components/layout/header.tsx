// components/Header.tsx
/** @format */
"use client";

import React, { useTransition } from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button, UserButton } from "@/components/ui/buttons";
import { toggleThemeCookie } from "@/utils/themeCookie";
import type { PaletteMode } from "@mui/material";

export default function Header({ mode }: { mode: PaletteMode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isDark = mode === "dark";

  const handleThemeToggle = () => {
    startTransition(async () => {
      await toggleThemeCookie();
      router.refresh();
    });
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Button variant="back" tooltip="Go back" onClick={() => router.back()} />
            <Button variant="home" tooltip="Go to home" onClick={() => router.push("/")} />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Welcome to UI
          </Typography>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              variant="darkMode"
              tooltip={isDark ? "Light mode" : "Dark mode"}
              themeMode={isDark ? "dark" : "light"}
              onClick={handleThemeToggle}
              loading={isPending}
            />
            <UserButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
