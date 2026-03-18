/** @format */
"use client";

import React from "react";

import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

import UserButton from "@/components/ui/UserButton";
import DarkModeButton from "@/components/ui/DarkModeButton";
import BackButton from "@/components/ui/BackButton";
import HomeButton from "../ui/HomeButton";

export default function Header() {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ЛІВА СЕКЦІЯ */}
          <Box sx={{ flex: 1, display: "flex" }}>
            <BackButton />
            <HomeButton />
          </Box>

          {/* ЦЕНТРАЛЬНА СЕКЦІЯ */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Welcome to UI
          </Typography>

          {/* ПРАВА СЕКЦІЯ */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <DarkModeButton />
            <UserButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
