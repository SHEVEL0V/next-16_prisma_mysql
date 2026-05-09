/**
 * useModal Hook
 * Manages modal/dialog open/close state with callbacks
 * Provides consistent modal state management across components
 */

'use client';

import { useState, useCallback } from 'react';

interface UseModalOptions {
	onOpen?: () => void;
	onClose?: () => void;
}

/**
 * Hook for managing modal/dialog open/close state
 * 
 * @param initialOpen - Initial open state (default: false)
 * @param options - Configuration options with callbacks
 * @returns Object with open state and handlers
 * 
 * @example
 * const { open, handleOpen, handleClose } = useModal();
 * 
 * return (
 *   <>
 *     <Button onClick={handleOpen}>Open Modal</Button>
 *     <Modal open={open} onClose={handleClose}>
 *       Content
 *     </Modal>
 *   </>
 * );
 */
export function useModal(initialOpen = false, options?: UseModalOptions) {
	const [open, setOpen] = useState(initialOpen);

	const handleOpen = useCallback(() => {
		setOpen(true);
		options?.onOpen?.();
	}, [options]);

	const handleClose = useCallback(() => {
		setOpen(false);
		options?.onClose?.();
	}, [options]);

	const toggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	return {
		open,
		handleOpen,
		handleClose,
		toggle,
		setOpen,
	};
}
