/** @format */

import React from "react";
import Dashboard from "@/components/ui/dashboard";
import Container from "@mui/material/Container";

const card = [
  { name: "Персонал", link: "/pers" },
  { name: "Дошка", link: "/board" },
  { name: "Тест", link: "/test" },
];

export default function Menu() {
  return (
    <Container maxWidth="xl">
      <Dashboard menu={card} />
    </Container>
  );
}
