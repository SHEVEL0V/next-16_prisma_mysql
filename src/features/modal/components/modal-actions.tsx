/** @format */

'use client';

import React from 'react';
import { DialogActions } from '@mui/material';
import { Button } from '@/components/ui/buttons';
import { MESSAGES } from '@/constants';

interface ModalActionsProps {
	/** Primary action button label */
	primaryLabel?: string;
	/** Cancel button label */
	cancelLabel?: string;
	/** Primary action button type (submit, button) */
	primaryType?: 'submit' | 'button';
	/** Callback when primary button is clicked */
	onPrimary?: () => void;
	/** Callback when cancel button is clicked */
	onCancel: () => void;
	/** Whether buttons are disabled */
	disabled?: boolean;
	/** Form ID for submit button */
	formId?: string;
	/** Loading state */
	loading?: boolean;
	/** Loading text for button */
	loadingText?: string;
	/** Show cancel button */
	showCancel?: boolean;
}

/**
 * ModalActions Component
 * Reusable modal footer with standard action buttons
 *
 * @component
 * @example
 * <ModalActions
 *   primaryLabel="Create"
 *   onCancel={handleClose}
 *   formId="create-form"
 * />
 */
export default function ModalActions({
	primaryLabel = MESSAGES.save,
	cancelLabel = MESSAGES.cancel,
	primaryType = 'submit',
	onPrimary,
	onCancel,
	disabled = false,
	formId,
	loading = false,
	loadingText,
	showCancel = true,
}: ModalActionsProps) {
	return (
		<DialogActions sx={{ p: 2, gap: 1 }}>
			{showCancel && (
				<Button
					variant="secondary"
					onClick={onCancel}
					disabled={disabled || loading}
				>
					{cancelLabel}
				</Button>
			)}
			{primaryType === 'submit' ? (
				<Button
					variant="submit"
					type="submit"
					form={formId}
					loading={loading}
					loadingText={loadingText}
					disabled={disabled}
				>
					{primaryLabel}
				</Button>
			) : (
				<Button
					variant="primary"
					onClick={onPrimary}
					disabled={disabled || loading}
				>
					{primaryLabel}
				</Button>
			)}
		</DialogActions>
	);
}
