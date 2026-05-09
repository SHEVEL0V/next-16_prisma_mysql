/**
 * Unified Button Component
 * Consolidates all button variants (Add, Submit, Back, Close, etc.)
 * Provides flexible button configuration with type safety
 */

'use client';

import React, { memo, useCallback, type ReactNode, type MouseEvent } from 'react';
import {
	Button as MuiButton,
	IconButton as MuiIconButton,
	CircularProgress,
	Tooltip,
	type ButtonProps as MuiButtonProps,
	type IconButtonProps as MuiIconButtonProps,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';

/**
 * Button variant types
 */
export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'icon'
	| 'submit'
	| 'add'
	| 'back'
	| 'close'
	| 'home'
	| 'more'
	| 'darkMode';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
	/** Button variant/type */
	variant?: ButtonVariant;
	/** Loading state */
	loading?: boolean;
	/** Loading text to display */
	loadingText?: string;
	/** Tooltip text */
	tooltip?: string;
	/** For icon buttons - position of tooltip */
	tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
	/** Callback for back button */
	onBack?: () => void;
	/** Callback for dark mode toggle */
	onThemeToggle?: (isDark: boolean) => void;
	/** Current theme mode (for dark mode button) */
	themeMode?: 'light' | 'dark';
	/** Menu items for more button */
	menuItems?: Array<{ label: string; onClick: () => void }>;
}

/**
 * Unified Button Component
 * Consolidates all button variants into a single component
 *
 * @component
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 *
 * // Add button (icon)
 * <Button variant="add" />
 *
 * // Submit button with loading state
 * <Button variant="submit" loading={isPending}>Save</Button>
 *
 * // Back button
 * <Button variant="back" />
 */
export const Button = memo(
	({
		variant = 'primary',
		loading = false,
		loadingText,
		tooltip,
		tooltipPlacement = 'top',
		onBack,
		onThemeToggle,
		themeMode = 'light',
		children,
		onClick,
		sx,
		...props
	}: ButtonProps) => {
		const router = useRouter();

		// Handle back button click
		const handleBackClick = useCallback(() => {
			if (onBack) {
				onBack();
			} else {
				router.back();
			}
		}, [router, onBack]);

		// Handle dark mode toggle
		const handleThemeToggle = useCallback(() => {
			onThemeToggle?.(themeMode === 'dark');
		}, [themeMode, onThemeToggle]);

		// Handle generic click
		const handleClick = useCallback(
			(e: MouseEvent<HTMLButtonElement>) => {
				if (onClick && typeof onClick === 'function') {
					onClick(e);
				}
			},
			[onClick],
		);

		// Icon button wrapper
		const renderIconButton = (
			iconElement: ReactNode,
			color: 'primary' | 'inherit' = 'primary',
			onClickHandler?: (e: MouseEvent<HTMLButtonElement>) => void,
		) => {
			const iconButtonEl = (
				<MuiIconButton
					onClick={onClickHandler}
					disabled={loading || props.disabled}
					color={color}
					size={props.size || 'medium'}
					sx={{
						p: '8px',
						...sx,
					}}
					{...(props as MuiIconButtonProps)}
				>
					{loading ? (
						<CircularProgress
							size={24}
							color={color === 'inherit' ? 'inherit' : 'primary'}
						/>
					) : (
						iconElement
					)}
				</MuiIconButton>
			);

			if (tooltip) {
				return (
					<Tooltip title={tooltip} placement={tooltipPlacement}>
						<span>{iconButtonEl}</span>
					</Tooltip>
				);
			}

			return iconButtonEl;
		};

		// Render based on variant
		switch (variant) {
			case 'add':
				return renderIconButton(<AddBoxIcon fontSize="large" />, 'primary');

			case 'back':
				return renderIconButton(
					<ArrowBackIcon />,
					'inherit',
					handleBackClick,
				);

			case 'close':
				return renderIconButton(
					<CloseIcon />,
					'inherit',
					handleClick,
				);

			case 'home':
				return renderIconButton(
					<HomeIcon />,
					'inherit',
					handleClick,
				);

			case 'more':
				return renderIconButton(
					<MoreVertIcon />,
					'inherit',
					handleClick,
				);

			case 'darkMode':
				return renderIconButton(
					themeMode === 'dark' ? (
						<Brightness7Icon sx={{ color: '#ffb74d' }} />
					) : (
						<Brightness4Icon sx={{ color: '#1976d2' }} />
					),
					'inherit',
					handleThemeToggle,
				);

			case 'submit':
				return (
					<MuiButton
						type="submit"
						fullWidth
						variant="contained"
						disabled={loading || props.disabled}
						size="large"
						disableElevation
						sx={{
							mt: 1,
							height: 52,
							textTransform: 'none',
							fontSize: '1.05rem',
							fontWeight: 600,
							borderRadius: 2,
							...sx,
						}}
						onClick={handleClick}
						{...(props as MuiButtonProps)}
					>
						{loading ? (
							<>
								<CircularProgress size={24} color="inherit" sx={{ mr: 1.5 }} />
								{loadingText || 'Loading...'}
							</>
						) : (
							children
						)}
					</MuiButton>
				);

			case 'secondary':
				return (
					<MuiButton
						variant="outlined"
						disabled={loading || props.disabled}
						sx={{
							textTransform: 'none',
							...sx,
						}}
						onClick={handleClick}
						{...(props as MuiButtonProps)}
					>
						{loading ? (
							<>
								<CircularProgress size={20} sx={{ mr: 1 }} />
								{loadingText}
							</>
						) : (
							children
						)}
					</MuiButton>
				);

			case 'primary':
			default:
				return (
					<MuiButton
						variant="contained"
						disabled={loading || props.disabled}
						sx={{
							textTransform: 'none',
							...sx,
						}}
						onClick={handleClick}
						{...(props as MuiButtonProps)}
					>
						{loading ? (
							<>
								<CircularProgress size={20} sx={{ mr: 1 }} />
								{loadingText}
							</>
						) : (
							children
						)}
					</MuiButton>
				);
		}
	},
);

Button.displayName = 'Button';

export default Button;
