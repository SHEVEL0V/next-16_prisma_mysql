/** @format */

'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

/**
 * useModalNavigation Hook
 * Handles modal open/close with router integration
 *
 * @component
 * @example
 * const { isOpen, open, close } = useModalNavigation();
 */
export function useModalNavigation() {
	const router = useRouter();

	const open = useCallback(() => {
		// Modal is considered open by rendering it
		return true;
	}, []);

	const close = useCallback(() => {
		router.back();
	}, [router]);

	const toggle = useCallback(() => {
		close();
	}, [close]);

	return {
		open,
		close,
		toggle,
	};
}
