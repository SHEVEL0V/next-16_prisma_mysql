/** @format */

import { getTheme } from "@/utils/theme"; // Приклад твого імпорту
import ThemeClientProvider from "@/components/providers"; // Приклад твого імпорту

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeMode = (await getTheme()) || "light";

  const bgImageClass =
    themeMode === "light"
      ? "bg-[url('/img/bg-light.jpeg')]"
      : "bg-[url('/img/bg-dark.jpeg')]";

  return (
    <html lang="en">
      <body
        className={`
          ${bgImageClass}
          bg-cover bg-center bg-no-repeat bg-fixed 
          transition-all duration-500 ease-in-out
        `}
      >
        <ThemeClientProvider mode={themeMode}>{children}</ThemeClientProvider>
      </body>
    </html>
  );
}
