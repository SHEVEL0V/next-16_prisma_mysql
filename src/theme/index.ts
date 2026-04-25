/** @format */
"use client";

import { createTheme, type PaletteMode, alpha } from "@mui/material";
import { Roboto } from "next/font/google";
import { DESIGN_TOKENS } from "./constants";
import type {} from "@mui/x-data-grid/themeAugmentation";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin", "cyrillic"],
	display: "swap",
});

declare module "@mui/material/styles" {
	interface Theme {
		custom: typeof DESIGN_TOKENS;
	}
	interface ThemeOptions {
		custom?: typeof DESIGN_TOKENS;
	}
}

declare module "@mui/material/Paper" {
	interface PaperPropsVariantOverrides {
		boardColumn: true;
	}
}

export const getTheme = (mode: PaletteMode) => {
	const isDark = mode === "dark";

	return createTheme({
		cssVariables: {
			colorSchemeSelector: "class", // Дозволяє зручно перемикати теми через клас
		},
		palette: {
			mode,
			primary: {
				main: isDark ? "#60a5fa" : "#2563eb", // Трохи м'якші кольори для dark mode
				contrastText: "#fff",
			},
			text: {
				primary: isDark ? "#f8fafc" : "#0f172a", // Більш глибокий і контрастний текст
				secondary: isDark ? "#94a3b8" : "#475569", // Чіткіший відтінок сірого
			},
			background: {
				default: isDark ? "#0f172a" : "#f1f5f9", // Темніший відтінок світлого фону, щоб плашки яскраво виділялися
				paper: isDark ? "#1e293b" : "#ffffff",
			},
			divider: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.12)", // Більш чіткі лінії та бордери
		},
		typography: {
			fontFamily: roboto.style.fontFamily,
			button: { textTransform: "none", fontWeight: 600 },
		},
		shape: { borderRadius: DESIGN_TOKENS.borderRadius },
		custom: DESIGN_TOKENS,

		components: {
			MuiCssBaseline: {
				styleOverrides: (theme) => ({
					"html, body": {
						height: "100%",
						margin: 0,
						WebkitFontSmoothing: "antialiased",
						MozOsxFontSmoothing: "grayscale",
					},
					body: {
						backgroundColor: theme.palette.background.default,
						transition: theme.transitions.create("background-color", {
							duration: 300,
						}),
					},
					".glass-effect": {
						backgroundColor: alpha(theme.palette.background.paper, 0.8),
						backdropFilter: "blur(10px)",
						border: `1px solid ${theme.palette.divider}`, // Використовуємо чіткіший бордер замість прозорого
					},
					"*::-webkit-scrollbar": {
						width: 6,
						height: 6,
					},
					"*::-webkit-scrollbar-thumb": {
						backgroundColor: alpha(theme.palette.divider, 0.2),
						borderRadius: 4,
						"&:hover": {
							backgroundColor: alpha(theme.palette.divider, 0.4),
						},
					},
					"@keyframes fadeIn": {
						from: { opacity: 0, transform: "translateY(10px)" },
						to: { opacity: 1, transform: "translateY(0)" },
					},
				}),
			},
			MuiAppBar: {
				defaultProps: { elevation: 0 },
				styleOverrides: {
					root: ({ theme }) => ({
						height: DESIGN_TOKENS.headerHeight,
						backgroundColor: alpha(theme.palette.background.paper, 0.8),
						backdropFilter: "blur(12px)",
						borderBottom: `1px solid ${theme.palette.divider}`,
						color: theme.palette.text.primary,
					}),
				},
			},
			MuiButton: {
				defaultProps: { disableElevation: true },
				styleOverrides: {
					root: ({ theme }) => ({
						borderRadius: Number(theme.shape.borderRadius) * 1.5,
						padding: "8px 16px",
						transition: theme.transitions.create(
							["transform", "background-color", "box-shadow"],
							{
								duration: 200,
							},
						),
						"&:active": { transform: "scale(0.96)" },
					}),
				},
			},
			MuiCard: {
				styleOverrides: {
					root: ({ theme }) => ({
						backgroundImage: "none",
						borderRadius: Number(theme.shape.borderRadius) * 2,
						border: `1px solid ${theme.palette.divider}`,
						transition: theme.transitions.create([
							"box-shadow",
							"border-color",
							"transform",
						]),
						"&:hover": {
							boxShadow: isDark
								? "0 8px 24px -8px rgba(0,0,0,0.5)"
								: theme.shadows[3],
							borderColor: alpha(theme.palette.primary.main, 0.3),
						},
					}),
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundImage: "none",
					},
				},
				variants: [
					{
						props: { variant: "boardColumn" },
						style: ({ theme }) => ({
							padding: theme.spacing(2),
							minWidth: 280,
							width: 280,
							flexShrink: 0,
							[theme.breakpoints.up("sm")]: {
								minWidth: 320,
								width: 320,
							},
							height: "fit-content",
							maxHeight: "88vh",
							display: "flex",
							flexDirection: "column",
							backgroundColor: alpha(theme.palette.background.default, 0.4),
							borderRadius: Number(theme.shape.borderRadius) * 3,
						}),
					},
				],
			},
			MuiDialogActions: {
				styleOverrides: {
					root: ({ theme }) => ({
						padding: theme.spacing(2, 3),
					}),
				},
			},
			MuiAlert: {
				styleOverrides: {
					root: ({ theme }) => ({
						borderRadius: Number(theme.shape.borderRadius) * 2,
					}),
				},
			},
			MuiCardContent: {
				styleOverrides: {
					root: ({ theme }) => ({
						padding: theme.spacing(1.5),
						"&:last-child": { paddingBottom: theme.spacing(1.5) },
					}),
				},
			},
			MuiDataGrid: {
				styleOverrides: {
					root: {
						border: "none",
						borderRadius: 0,
						height: "100vh",
					},
				},
			},
		},
	});
};
