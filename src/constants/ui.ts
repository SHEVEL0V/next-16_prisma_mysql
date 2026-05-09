/**
 * UI Constants
 * Centralized configuration for UI elements (sizes, spacing, timing)
 */

/**
 * Modal and dialog sizes
 */
export const MODAL_SIZES = {
	sm: 'sm' as const,
	md: 'md' as const,
	lg: 'lg' as const,
} as const;

/**
 * Spacing values for grid, margins, and padding
 */
export const SPACING = {
	xs: 1,
	sm: 2,
	md: 3,
	lg: 4,
	xl: 5,
} as const;

/**
 * Timing constants for animations, delays, and debouncing
 */
export const TIMING = {
	/** Modal close delay after successful action */
	modalCloseDelay: 1500,
	/** Debounce delay for search and input handlers */
	debounceDelay: 300,
	/** Transition duration for animations */
	transitionDuration: 500,
	/** Tooltip delay before showing */
	tooltipDelay: 200,
} as const;

/**
 * Icon sizes (MUI standard sizes)
 */
export const ICON_SIZES = {
	small: 'small' as const,
	medium: 'medium' as const,
	large: 'large' as const,
} as const;

/**
 * Button sizes
 */
export const BUTTON_SIZES = {
	small: 'small' as const,
	medium: 'medium' as const,
	large: 'large' as const,
} as const;

/**
 * Button variants
 */
export const BUTTON_VARIANTS = {
	contained: 'contained' as const,
	outlined: 'outlined' as const,
	text: 'text' as const,
} as const;

/**
 * Grid configuration
 */
export const GRID_CONFIG = {
	spacing: 2,
	maxColumns: 4,
} as const;

/**
 * Form field configuration
 */
export const FORM_CONFIG = {
	fullWidth: true,
	variant: 'outlined' as const,
	margin: 'normal' as const,
} as const;

/**
 * Dialog/Modal configuration
 */
export const DIALOG_CONFIG = {
	fullWidth: true,
	maxWidth: 'sm' as const,
	disableEscapeKeyDown: false,
} as const;
