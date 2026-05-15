/** @format */

'use client';

import React from 'react';
import { FormHelperText, Box } from '@mui/material';

interface FormFieldErrorProps {
	/** Field name to check for errors */
	fieldName: string;
	/** Errors object from form state */
	errors?: Record<string, unknown>;
}

/**
 * FormFieldError Component
 * Displays inline error message for a specific form field
 *
 * @component
 * @example
 * <TextField name="email" label="Email" />
 * <FormFieldError fieldName="email" errors={formState.errors} />
 */
export default function FormFieldError({
	fieldName,
	errors,
}: FormFieldErrorProps) {
	if (!errors || !fieldName) {
		return null;
	}

	const error = errors[fieldName];
	if (!error) {
		return null;
	}

	const errorMessage = typeof error === 'string' ? error : String(error);

	return (
		<Box sx={{ mt: 0.5 }}>
			<FormHelperText error>{errorMessage}</FormHelperText>
		</Box>
	);
}
