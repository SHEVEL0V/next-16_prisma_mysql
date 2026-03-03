/** @format */
"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box
        component="main"
        sx={{
          flex: "1 0 auto", // Дозволяє контенту розширюватися, штовхаючи футер
          width: "100%",
          paddingTop: `${theme.custom.headerHeight}px`,

          animation: "fadeIn 0.5s ease-in-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(10px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {children}
      </Box>

      <Footer />
    </main>
  );
}
