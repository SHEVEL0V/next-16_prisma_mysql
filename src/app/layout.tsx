/** @format */

import { getTheme } from "@/utils/theme"; // Приклад твого імпорту
import ThemeClientProvider from "@/components/layout/muiThem"; // Приклад твого імпорту

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeMode = (await getTheme()) || "light";

  return (
    <html lang="en">
      <body>
        <ThemeClientProvider mode={themeMode}>{children}</ThemeClientProvider>
      </body>
    </html>
  );
}
