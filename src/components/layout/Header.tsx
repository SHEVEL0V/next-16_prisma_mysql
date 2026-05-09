/** @format */

'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { Button } from '@/components/ui/buttons';
import UserButton from '@/components/ui/UserButton';

/**
 * Header Component
 * Main application header with navigation buttons
 * Displays back, home, theme toggle, and user menu
 */
export default function Header() {
	return (
		<AppBar>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Left section - navigation buttons */}
					<Box sx={{ flex: 1, display: 'flex' }}>
						<Button variant="back" tooltip="Go back" />
						<Button variant="home" tooltip="Go to home" />
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
							gap: 1,
						}}
					>
						<Button variant="darkMode" tooltip="Toggle theme" />
						<UserButton />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
