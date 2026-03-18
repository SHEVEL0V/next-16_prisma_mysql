/** @format */

import React from "react";
import DashboardGrid from "@/components/ui/DashboardGrid";
import Container from "@mui/material/Container";

const card = [
  { name: "Персонал", link: "/pers" },
  { name: "Дошка", link: "/board" },
  { name: "Тест", link: "/test" },
];

export default function Menu() {
  return (
    <Container maxWidth="xl">
      <DashboardGrid menu={card} />
    </Container>
  );
}
