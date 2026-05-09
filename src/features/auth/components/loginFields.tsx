/** @format */

import { TextField, Stack, Alert } from '@mui/material';
import { Button } from '@/components/ui/buttons';
import type { ActionResponse } from '@/types';
import { MESSAGES } from '@/constants';

interface LoginFieldsProps<T> {
	state: ActionResponse<T>;
	isPending: boolean;
}

const LOGIN_FIELDS = [
	{
		id: 'email',
		name: 'email',
		label: 'Email',
		type: 'email',
		autoComplete: 'email',
		autoFocus: true,
	},
	{
		id: 'password',
		name: 'password',
		label: 'Password',
		type: 'password',
		autoComplete: 'current-password',
	},
] as const;

/**
 * LoginFields Component
 * Renders login form fields (email, password) and submit button
 */
export function LoginFields<T>({ state, isPending }: LoginFieldsProps<T>) {
	const errors = 'errors' in state ? state.errors : undefined;

	return (
		<Stack spacing={2.5}>
			{LOGIN_FIELDS.map((field) => (
				<TextField
					key={field.id}
					fullWidth
					required
					disabled={isPending}
					error={!!errors?.[field.name as keyof typeof errors]}
					helperText={errors?.[field.name as keyof typeof errors]?.[0]}
					{...field}
				/>
			))}

			{/* Error alert only on failure */}
			{!state.success && state.message && (
				<Alert severity="error" variant="filled">
					{state.message}
				</Alert>
			)}

			<Button
				variant="submit"
				loading={isPending}
				loadingText={MESSAGES.loading}
			>
				{MESSAGES.login}
			</Button>
		</Stack>
	);
}
