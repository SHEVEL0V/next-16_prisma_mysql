/** @format */

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toggleTheme as toggleThemeServer } from "@/utils/theme";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => Promise<void>;
  isPending: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component that manages theme state globally
 * Wraps the application with theme context
 */
export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and document class on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const htmlClass = document.documentElement.classList.contains("dark");

    const initialTheme = storedTheme || (htmlClass ? "dark" : "light");
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(async () => {
    startTransition(async () => {
      try {
        const newTheme = await toggleThemeServer();
        setTheme(newTheme as "light" | "dark");
        router.refresh();
      } catch (error) {
        console.error("Failed to toggle theme:", error);
      }
    });
  }, [router]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isPending }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * @returns Theme context with theme, toggleTheme, and isPending
 */
export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeToggle must be used within ThemeContextProvider");
  }
  return {
    toggleThemeMode: context.toggleTheme,
    isPending: context.isPending,
    isDark: context.theme === "dark",
    theme: context.theme,
  };
};

export default useThemeToggle;
