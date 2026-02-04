/** @format */

import React from "react";
import Box from "@mui/material/Box";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          overflow: "hidden",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
