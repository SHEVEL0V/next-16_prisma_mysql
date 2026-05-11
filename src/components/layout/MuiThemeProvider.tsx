/** @format */

"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { getTheme } from "@/theme";
import { useThemeToggle } from "./ThemeContextProvider";

function ThemeConsumer({
	children,
	initialMode,
}: {
	children: React.ReactNode;
	initialMode: "light" | "dark";
}) {
	const { theme } = useThemeToggle();
	const muiTheme = createTheme(getTheme(theme));

	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default function ThemeClientProvider({
	children,
	mode,
}: {
	children: React.ReactNode;
	mode: "light" | "dark";
}) {
	return (
		<ThemeConsumer initialMode={mode}>{children}</ThemeConsumer>
	);
}
