/**
 * useFormAction Hook
 * Wrapper around useActionState with built-in error handling and success callbacks
 * Provides type-safe form action handling with automatic state management
 */

'use client';

import { useActionState, useEffect } from 'react';
import type { ActionResponse } from '@/types';

interface UseFormActionOptions {
	onSuccess?: () => void;
	onError?: (errors: Record<string, string[]>) => void;
}

/**
 * Hook for managing server action state with error handling
 *
 * @template R - Response/return data type
 * @param action - Server action function
 * @param options - Configuration options
 * @returns Object with state, formAction, and isPending
 *
 * @example
 * const { state, formAction, isPending } = useFormAction(
 *   createBoardAction,
 *   { onSuccess: () => router.push('/boards') }
 * );
 */
export function useFormAction<R extends Record<string, unknown> = Record<string, unknown>>(
	action: (
		prevState: ActionResponse<Record<string, unknown>>,
		formData: FormData,
	) => Promise<ActionResponse<R>>,
	options?: UseFormActionOptions,
) {
	const [state, formAction, isPending] = useActionState(
		action as (
			prevState: ActionResponse<R>,
			formData: FormData,
		) => Promise<ActionResponse<R>>,
		{
			success: false,
			errors: {},
		} as ActionResponse<R>,
	);

	// Handle success callback
	useEffect(() => {
		if (state.success && options?.onSuccess) {
			const timer = setTimeout(options.onSuccess, 1000);
			return () => clearTimeout(timer);
		}
	}, [state.success, options]);

	// Handle error callback
	useEffect(() => {
		if (!state.success && 'errors' in state && options?.onError) {
			options.onError(state.errors as Record<string, string[]>);
		}
	}, [state, options]);

	return { state, formAction, isPending };
}
