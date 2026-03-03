/** @format */
"use client";

import React from "react";

import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

import ButtonUser from "@/components/ui/buttons/user";
import ButtonDarkMode from "@/components/ui/buttons/darkMode";
import ButtonBack from "@/components/ui/buttons/back";
import ButtonHome from "../ui/buttons/home";

export default function Header() {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ЛІВА СЕКЦІЯ */}
          <Box sx={{ flex: 1, display: "flex" }}>
            <ButtonBack />
            <ButtonHome />
          </Box>

          {/* ЦЕНТРАЛЬНА СЕКЦІЯ */}
          <Typography variant="subtitle1" className="header-title">
            Welcome to UI
          </Typography>

          {/* ПРАВА СЕКЦІЯ */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <ButtonDarkMode />
            <ButtonUser />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
