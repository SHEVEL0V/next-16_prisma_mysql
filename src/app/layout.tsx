"use server";
/** @format */
import "./globals.css";
import MuiThemeProvider from "@/components/layout/mui-theme-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { getThemeCookie } from "@/utils/theme-cookie";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = await getThemeCookie();
  return (
    <html lang="uk">
      <body>
        <AppRouterCacheProvider>
          <MuiThemeProvider mode={mode}>{children}</MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
