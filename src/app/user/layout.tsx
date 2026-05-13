/** @format */

import type React from "react";
import { Box } from "@mui/material";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getThemeCookie } from "@/utils/themeCookie";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const mode = await getThemeCookie();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header mode={mode} />
      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          width: "100%",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        {children}
      </Box>

      <Footer />
    </div>
  );
}
