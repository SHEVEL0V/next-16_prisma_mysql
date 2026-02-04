/** @format */
import type { Metadata } from "next";
import "./globals.css";
import { getTheme } from "@/actions/theme";
import ThemeClientProvider from "@/components/providers";

export const metadata: Metadata = {
  title: "UI ⚙",
  description: "Project Table UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeMode = (await getTheme()) || "light";
  console.log("Theme mode in layout:", themeMode);
  return (
    <html lang="en">
      <body className="bg-[url('/img/bg.jpeg')] bg-cover bg-center bg-no-repeat bg-fixed">
        <ThemeClientProvider mode={themeMode}>{children}</ThemeClientProvider>
      </body>
    </html>
  );
}
