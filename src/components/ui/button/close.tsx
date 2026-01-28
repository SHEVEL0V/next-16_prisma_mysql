/** @format */

"use client";

import { useRouter } from "next/navigation";

export default function ButtonClose() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      type="button"
      aria-label="Закрити"
      className="group flex items-center justify-center p-2 rounded-full border border-transparent
                 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600
                 transition-all duration-300 shadow-md active:scale-95"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-neutral-600 dark:text-white"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}
