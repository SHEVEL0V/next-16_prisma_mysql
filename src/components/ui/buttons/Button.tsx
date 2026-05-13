/** @format */
"use client";

import { IconButton, type IconVariant, type IconButtonProps } from "./IconButton";
import { TextButton, type TextButtonVariant, type TextButtonProps } from "./TextButton";

export type ButtonVariant = TextButtonVariant | IconVariant;

export type ButtonProps =
  | (Omit<TextButtonProps, "variant"> & { variant?: TextButtonVariant })
  | (Omit<IconButtonProps, "variant"> & { variant: IconVariant });

const ICON_VARIANTS = new Set(["add", "back", "close", "home", "more", "darkMode"]);

export const Button = (props: ButtonProps) => {
  const { variant = "primary" } = props;

  return ICON_VARIANTS.has(variant as string) ? (
    <IconButton {...(props as IconButtonProps)} variant={variant as IconVariant} />
  ) : (
    <TextButton {...(props as TextButtonProps)} variant={variant as TextButtonVariant} />
  );
};

export default Button;
