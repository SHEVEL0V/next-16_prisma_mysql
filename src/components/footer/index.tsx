/** @format */
"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: 80, // Відповідає h-20 (20 * 4px = 80px)
        display: "flex",
        alignItems: "center", // Вертикальне центрування
        justifyContent: "center", // Горизонтальне центрування
        boxShadow: 3, // Відповідає shadow-lg
        mt: "auto", // Щоб футер притискався до низу, якщо сторінка коротка

        // Логіка фону (світла/темна тема)
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.100",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          align="center"
          sx={{
            fontWeight: "bold", // font-bold
            // Логіка кольору тексту (text-green-700 / text-green-500)
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "success.light" // Світло-зелений для темної теми
                : "success.dark", // Темно-зелений для світлої теми
          }}
        >
          © 2025 ... UI. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
