/** @format */

"use server";

import { cookies } from "next/headers";

export async function toggleTheme() {
  const cookieStore = await cookies();

  // 1. Отримуємо поточне значення з кукі
  const themeCookie = cookieStore.get("theme");

  // 2. Визначаємо поточну тему (якщо кукі немає — вважаємо, що зараз 'light')
  const currentTheme = themeCookie?.value === "dark" ? "dark" : "light";

  // 3. Обчислюємо нову тему (протилежну до поточної)
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // 4. Записуємо нову тему
  cookieStore.set("theme", newTheme, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 рік
    path: "/",
  });

  // 5. Повертаємо нову тему, якщо треба
  return newTheme;
}

export const getTheme = async () => {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  return themeCookie?.value === "dark" ? "dark" : "light";
};
