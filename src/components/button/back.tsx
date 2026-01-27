/** @format */

"use client";

import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer fill-neutral-700   dark:fill-white border rounded-full border-solid shadow-2xl
       mr-2 hover:bg-slate-400 dark:hover:bg-slate-700 transition duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="">
        <path d="M13.54 18a2.06 2.06 0 0 1-1.3-.46l-5.1-4.21a1.7 1.7 0 0 1 0-2.66l5.1-4.21a2.1 2.1 0 0 1 2.21-.26 1.76 1.76 0 0 1 1.05 1.59v8.42a1.76 1.76 0 0 1-1.05 1.59 2.23 2.23 0 0 1-.91.2z" />{" "}
      </svg>
    </button>
  );
}
