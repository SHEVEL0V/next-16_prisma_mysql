/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
}
