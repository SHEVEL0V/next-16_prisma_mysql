/** @format */
"use client";

import React from "react";
import { Box } from "@mui/material";
import AddButton from "@/components/ui/AddButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Profile({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
      <Box
        component={Link}
        href={`${pathname}/add`}
        sx={{
          position: "fixed",
          bottom: 96,
          right: 32,
          zIndex: 50,
          borderRadius: "50%",
          boxShadow: 3,
          opacity: 0.8,
          transition: "opacity 0.3s",
          "&:hover": { opacity: 1 },
        }}
      >
        <AddButton isPending={false} />
      </Box>

      {children}
      {modal}
    </Box>
  );
}
