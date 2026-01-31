/** @format */

"use client";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

export default function ButtonClose() {
  const router = useRouter();

  return (
    <IconButton onClick={() => router.back()} aria-label="Закрити">
      <CloseIcon />
    </IconButton>
  );
}
