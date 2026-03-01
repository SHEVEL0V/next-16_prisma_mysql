/** @format */
"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

import ButtonUser from "@/components/ui/button/user";
import ButtonDarkMode from "@/components/ui/button/darkMode";
import ButtonBack from "@/components/ui/button/back";

export default function Header() {
  return (
    <AppBar component="header" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* ЛІВА СЕКЦІЯ: Фіксована ширина, щоб збалансувати центр */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <ButtonBack />
          </Box>

          {/* ЦЕНТРАЛЬНА СЕКЦІЯ: Завжди по центру */}
          <Typography variant="h6" component="h1" className="header-title">
            Welcome to UI
          </Typography>

          {/* ПРАВА СЕКЦІЯ: Фіксована ширина, вирівнювання вправо */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <ButtonDarkMode />
            <ButtonUser />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
