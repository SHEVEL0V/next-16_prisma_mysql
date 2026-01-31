/** @format */

"use client";

import Link from "next/link";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function ButtonAdd() {
  return (
    <Fab
      color="primary"
      aria-label="add"
      component={Link}
      href="/user/balu/pers/add"
      sx={{
        position: "fixed",
        bottom: 40,
        right: 32,
        zIndex: 50,
      }}
    >
      <AddIcon />
    </Fab>
  );
}
