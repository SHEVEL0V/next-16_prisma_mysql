/** @format */
"use client";
import { useState, useEffect } from "react";

export const useDarkMode = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const setTheme = (value: boolean) => {
    document.documentElement.classList.toggle("dark", value);
    setIsDarkMode(value);
  };

  useEffect(() => {
    const theme =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(theme);
  }, []);

  const toggleDarkMode = () => {
    setTheme(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return [isDarkMode, toggleDarkMode];
};
