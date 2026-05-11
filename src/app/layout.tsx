/** @format */
import "./globals.css";
import { getTheme } from "@/utils/theme";
import ThemeProvider from "@/components/layout/MuiThemeProvider";
import { ThemeContextProvider } from "@/components/layout/ThemeContextProvider";
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
					<ThemeContextProvider>
						<ThemeProvider mode={theme}>{children}</ThemeProvider>
					</ThemeContextProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
