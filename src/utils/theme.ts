/** @format */

"use server";

import { cookies } from "next/headers";

export async function toggleTheme() {
  const cookieStore = await cookies();

  const themeCookie = cookieStore.get("theme");

  const currentTheme = themeCookie?.value === "dark" ? "dark" : "light";

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  cookieStore.set("theme", newTheme, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 рік
    path: "/",
  });

  return newTheme;
}

export const getTheme = async () => {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  return themeCookie?.value === "dark" ? "dark" : "light";
};
