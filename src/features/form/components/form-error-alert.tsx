/** @format */

'use client';

import React from 'react';
import { Alert, Box } from '@mui/material';
import type { ActionResponse } from '@/types';

interface FormErrorAlertProps {
	/** Action state response */
	state: ActionResponse<Record<string, unknown>>;
	/** Optional custom message */
	message?: string;
}

/**
 * FormErrorAlert Component
 * Displays form submission errors or success messages
 *
 * @component
 * @example
 * <FormErrorAlert state={formState} />
 */
export default function FormErrorAlert({
	state,
	message,
}: FormErrorAlertProps) {
	// Only show if there's a message (success or error)
	if (!state.message && !message) {
		return null;
	}

	const displayMessage = message || state.message;
	const isSuccess = state.success;

	return (
		<Box sx={{ mb: 2 }}>
			<Alert
				severity={isSuccess ? 'success' : 'error'}
				variant="outlined"
				sx={{
					'& .MuiAlert-message': {
						width: '100%',
					},
				}}
			>
				{displayMessage}
			</Alert>
		</Box>
	);
}
