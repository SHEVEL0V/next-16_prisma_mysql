/** @format */

"use client";

import { useRouter } from "next/navigation";

export default function ButtonClose() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer fill-neutral-700 bg-gray-200 dark:bg-gray-400  dark:fill-white border rounded-full  shadow-2xl
       mr-2 hover:bg-slate-300 dark:hover:bg-slate-600 transition duration-300"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" />
      </svg>
    </button>
  );
}
