/** @format */

'use client';

import { Box, TextField, Typography } from '@mui/material';
import { useActionState } from 'react';
import { Button } from '@/components/ui/buttons';
import { createBoardAction } from '../../actions';

/**
 * CreateBoardForm Component
 * Form for creating a new board with inline title input and add button
 */
export default function CreateBoardForm({ isOpen }: { isOpen: boolean }) {
	const [state, formAction, isPending] = useActionState(createBoardAction, {
		success: false,
		errors: {},
	});

	return (
		<Box sx={{ p: 2 }}>
			<form
				action={formAction}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					justifyContent: isOpen ? 'flex-start' : 'center',
				}}
			>
				{isOpen && (
					<TextField
						name="title"
						size="small"
						placeholder="New board..."
						required
						fullWidth
						variant="outlined"
					/>
				)}
				<Button
					variant="add"
					title="Create board"
					disabled={isPending}
					tooltip="Create board"
				/>
			</form>

			{isOpen && !state.success && state.message && (
				<Typography color="error" variant="caption" sx={{ ml: 1 }}>
					{state.message}
				</Typography>
			)}
		</Box>
	);
}
