/** @format */

'use client';

import React from 'react';
import { DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalHeaderProps {
	/** Title text */
	title: string;
	/** Callback when close button is clicked */
	onClose: () => void;
	/** Whether close button is disabled */
	disabled?: boolean;
}

/**
 * ModalHeader Component
 * Reusable modal header with title and close button
 *
 * @component
 * @example
 * <ModalHeader title="Create Item" onClose={handleClose} />
 */
export default function ModalHeader({
	title,
	onClose,
	disabled = false,
}: ModalHeaderProps) {
	return (
		<DialogTitle
			sx={{
				m: 0,
				p: 2,
				pr: 6,
				fontWeight: 'bold',
				position: 'relative',
			}}
		>
			{title}
			<IconButton
				onClick={onClose}
				disabled={disabled}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: 'grey.500',
					'&:hover': {
						color: 'error.main',
					},
				}}
			>
				<CloseIcon />
			</IconButton>
		</DialogTitle>
	);
}
