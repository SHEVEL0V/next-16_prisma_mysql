/** @format */

'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Button, UserButton } from '@/components/ui/buttons';
import { useThemeToggle } from '@/components/layout/ThemeContextProvider';

/**
 * Header Component
 * Main application header with navigation buttons
 * Displays back, home, theme toggle, and user menu
 */
export default function Header() {
	const router = useRouter();
	const { toggleThemeMode, isPending, isDark } = useThemeToggle();

	const handleHomeClick = () => {
		router.push('/');
	};

	return (
		<AppBar>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Left section - navigation buttons */}
					<Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
						<Button variant="back" tooltip="Go back" />
						<Button 
							variant="home" 
							tooltip="Go to home"
							onHome={handleHomeClick}
						/>
					</Box>

					{/* Center section - title */}
					<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
						Welcome to UI
					</Typography>

					{/* Right section - theme and user menu */}
					<Box
						sx={{
							flex: 1,
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<Button
							variant="darkMode"
							tooltip={isDark ? 'Light mode' : 'Dark mode'}
							themeMode={isDark ? 'dark' : 'light'}
							onThemeToggle={toggleThemeMode}
							loading={isPending}
						/>
						<UserButton />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
