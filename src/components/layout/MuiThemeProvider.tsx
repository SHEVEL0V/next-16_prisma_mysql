/** @format */

"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "@/theme";

export default function ThemeClientProvider({
	children,
	mode,
}: {
	children: React.ReactNode;
	mode: "light" | "dark";
}) {
	const theme = createTheme(getTheme(mode));

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
