/** @format */

import React from "react";
import Dashboard from "@/components/ui/dashboard";

const card = [
  { name: "Персонал", link: "/pers" },
  { name: "Користувач", link: "/test" },
  { name: "Документи", link: "/test" },
  { name: "Звіти", link: "/test" },
  { name: "Новини", link: "/test" },
  { name: "Повідомлення", link: "/test" },
  { name: "Налаштування", link: "/test" },
  { name: "Допомога", link: "/test" },
];

export default function Menu() {
  return <Dashboard menu={card} />;
}
