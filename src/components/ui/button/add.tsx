/** @format */

import Link from "next/link";
import React from "react";

export default function ButtonAdd() {
  return (
    <Link
      href="/profile/balu/pers/add"
      className="fixed z-50 bottom-10 right-8 w-16 h-16 rounded-full cursor-pointer
     bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all"
    >
      Add
    </Link>
  );
}
