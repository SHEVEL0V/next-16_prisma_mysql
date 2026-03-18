/** @format */

"use client";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Або ArrowBackIosNew
import Tooltip from "@mui/material/Tooltip";

export default function ButtonBack() {
  const router = useRouter();

  return (
    <Tooltip title="Повернутися назад">
      <IconButton
        onClick={() => router.back()}
        color="inherit"
        edge="start"
        sx={{ mr: 1 }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
}
