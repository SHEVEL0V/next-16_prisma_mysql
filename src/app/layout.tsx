/** @format */

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "UI ⚙",
  description: "Project Table UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // auth
  const user = await getSession();
  // theme
  const themeMode: "light" | "dark" = user?.theme === "DARK" ? "dark" : "light";

  return (
    <html lang="en">
      <body className="bg-[url('/img/bg.jpeg')] bg-cover bg-center bg-no-repeat bg-fixed">
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
