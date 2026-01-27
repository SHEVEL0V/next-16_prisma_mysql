/** @format */

import React from "react";
import ButtonUser from "@/components/button/user";
import ButtonDarkMode from "@/components/button/darkMode";
import ButtonBack from "@/components/button/back";

export default function Header() {
  return (
    <header className="sticky bg-slate-100 dark:bg-slate-500  text-green-700 dark:text-green-500 text-4l p-2 font-weight: 800; shadow-lg flex items-center justify-center">
      <div className="flex mr-auto p-4">
        <ButtonBack />
        <ButtonDarkMode />
      </div>
      <h1 className="text-4xl font-bold">Welcome to UI</h1>
      <div className="ml-auto p-4">
        <ButtonUser />
      </div>
    </header>
  );
}
