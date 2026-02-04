/** @format */

import React from "react";
import { Box, Container } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          position: "sticky",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {children}
      </Container>

      <Footer />
    </Box>
  );
}
