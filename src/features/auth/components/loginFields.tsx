/** @format */
import { TextField, Stack, Alert } from "@mui/material";
import { ActionResponse } from "@/types";
import { SubmitButton } from "@/components/ui/SubmitButton";

interface LoginFieldsProps<T> {
	state: ActionResponse<T>;
	isPending: boolean;
}

const LOGIN_FIELDS = [
	{
		id: "email",
		name: "email",
		label: "Email",
		type: "email",
		autoComplete: "email",
		autoFocus: true,
	},
	{
		id: "password",
		name: "password",
		label: "Password",
		type: "password",
		autoComplete: "current-password",
	},
] as const;

export function LoginFields<T>({ state, isPending }: LoginFieldsProps<T>) {
	const errors = "errors" in state ? state.errors : undefined;

	return (
		<Stack spacing={2.5}>
			{LOGIN_FIELDS.map((field) => (
				<TextField
					key={field.id}
					fullWidth
					required
					disabled={isPending}
					error={!!errors?.[field.name as keyof typeof errors]}
					helperText={errors?.[field.name as keyof typeof errors]?.[0]}
					{...field}
				/>
			))}

			{/* Alert лише при помилці */}
			{!state.success && state.message && (
				<Alert severity="error" variant="filled">
					{state.message}
				</Alert>
			)}

			<SubmitButton
				isPending={isPending}
				label="Sign in"
				loadingText="Signing in..."
			/>
		</Stack>
	);
}
