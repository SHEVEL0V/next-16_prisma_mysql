/** @format */
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Персонал", link: "/pers" },
  { name: "Створити запис", link: "/create" },
  { name: "Документи", link: "/docs" },
  { name: "Звіти", link: "/report" },
  { name: "Новини", link: "/news" },
  { name: "Повідомлення", link: "/messages" },
  { name: "Налаштування", link: "/settings" },
  { name: "Допомога", link: "/help" },
];

export default function Menu() {
  const pathname = usePathname();
  const basePath = "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2];

  console.log("Base Path:", basePath);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {menu.map((item, index) => (
        <Link
          className="
          flex justify-center items-center 
          p-8 h-48 w-full
          bg-slate-200 dark:bg-slate-600 font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-slate-300 dark:hover:bg-slate-500 
          transition-shadow duration-300"
          key={index}
          href={basePath + item.link}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
