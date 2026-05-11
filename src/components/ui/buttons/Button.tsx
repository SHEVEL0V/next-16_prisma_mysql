/**
 * Unified Button Component
 * Routes to specialized button components based on variant
 * - Icon buttons: back, close, home, add, more, darkMode
 * - Text buttons: primary, secondary, submit
 */

"use client";

import React, { memo, type ReactNode } from "react";
import IconButton, { type IconVariant } from "./IconButton";
import TextButton, { type TextButtonVariant } from "./TextButton";
import type { IconButtonProps } from "./IconButton";
import type { TextButtonProps } from "./TextButton";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "icon"
  | "submit"
  | "add"
  | "back"
  | "close"
  | "home"
  | "more"
  | "darkMode";

export type ButtonProps = {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  [key: string]: any;
};

/**
 * Unified Button Component
 * Routes to appropriate button component based on variant
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
    variant = "primary",
    children,
    ...props
  }: ButtonProps) => {
    // Icon button variants
    const iconVariants: IconVariant[] = [
      "add",
      "back",
      "close",
      "home",
      "more",
      "darkMode",
    ];

    // Text button variants
    const textVariants: TextButtonVariant[] = [
      "primary",
      "secondary",
      "submit",
    ];

    if (iconVariants.includes(variant as IconVariant)) {
      return (
        <IconButton
          variant={variant as IconVariant}
          {...props}
        />
      );
    }

    if (textVariants.includes(variant as TextButtonVariant)) {
      return (
        <TextButton
          variant={variant as TextButtonVariant}
          {...props}
        >
          {children}
        </TextButton>
      );
    }

    // Default fallback to primary button
    return (
      <TextButton variant="primary" {...props}>
        {children}
      </TextButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
