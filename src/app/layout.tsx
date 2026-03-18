/** @format */

import { getTheme } from "@/utils/theme"; // Приклад твого імпорту
import ThemeProvider from "@/components/layout/muiThem"; // Приклад твого імпорту
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await getTheme()) || "light";

  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider mode={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
