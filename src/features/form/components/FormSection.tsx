/** @format */

'use client';

import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

interface FormSectionProps {
	/** Title of the section */
	title?: string;
	/** Description/subtitle */
	description?: string;
	/** Form fields */
	children: React.ReactNode;
}

/**
 * FormSection Component
 * Reusable wrapper for grouping related form fields with optional title and description
 *
 * @component
 * @example
 * <FormSection title="Personal Information" description="Please fill in your details">
 *   <TextField name="firstName" label="First Name" />
 *   <TextField name="lastName" label="Last Name" />
 * </FormSection>
 */
export default function FormSection({
	title,
	description,
	children,
}: FormSectionProps) {
	return (
		<Box component="section" sx={{ mb: 4 }}>
			{title && (
				<Box sx={{ mb: 2 }}>
					<Typography variant="h6" fontWeight="bold">
						{title}
					</Typography>
					{description && (
						<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
							{description}
						</Typography>
					)}
				</Box>
			)}
			<Stack spacing={2}>{children}</Stack>
		</Box>
	);
}
