/** @format */

'use client';

import { useRouter } from 'next/navigation';
import { FormModal } from './modals';
import type { ActionResponse } from '@/types';

interface CustomModalProps<T extends Record<string, unknown> = Record<string, unknown>> {
	fields: Array<{ name: string; label: string; type: string; required?: boolean }>;
	title?: string;
	action: (
		prevState: ActionResponse<T>,
		formData: FormData,
	) => Promise<ActionResponse<T>>;
}

/**
 * CustomModal Component (Deprecated)
 * Use FormModal instead - this is kept for backwards compatibility
 * Wraps FormModal with router-based close behavior
 *
 * @deprecated Use FormModal from src/components/ui/modals instead
 */
export default function CustomModal<T extends Record<string, unknown> = Record<string, unknown>>({
	fields,
	title = 'Fill out the form',
	action,
}: CustomModalProps<T>) {
	const router = useRouter();

	const handleClose = () => router.back();
	const handleSuccess = () => handleClose();

	return (
		<FormModal
			open
			onClose={handleClose}
			title={title}
			fields={fields}
			action={action}
			onSuccess={handleSuccess}
		/>
	);
}

