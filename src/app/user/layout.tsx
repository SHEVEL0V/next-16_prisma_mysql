/** @format */

import type React from "react";
import { Box } from "@mui/material";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getThemeCookie } from "@/utils/theme-cookie";
import { DESIGN_TOKENS } from "@/theme/constants";

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
          paddingTop: DESIGN_TOKENS.headerHeight + "px", // Adjust for AppBar height
        }}
      >
        {children}
      </Box>

      <Footer />
    </div>
  );
}
