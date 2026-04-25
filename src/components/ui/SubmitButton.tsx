/** @format */
import { Button, CircularProgress, type ButtonProps } from "@mui/material";

interface SubmitButtonProps extends ButtonProps {
	isPending: boolean;
	label: string;
	loadingText?: string;
}

export function SubmitButton({
	isPending,
	label,
	loadingText,
	...props
}: SubmitButtonProps) {
	return (
		<Button
			type="submit"
			fullWidth
			variant="contained"
			disabled={isPending}
			size="large"
			disableElevation
			sx={{
				mt: 1,
				height: 52,
				textTransform: "none",
				fontSize: "1.05rem",
				fontWeight: 600,
				borderRadius: 2,
				...props.sx, // дозволяє перевизначати стилі ззовні
			}}
			{...props}
		>
			{isPending ? (
				<>
					<CircularProgress size={24} color="inherit" sx={{ mr: 1.5 }} />
					{loadingText}
				</>
			) : (
				label
			)}
		</Button>
	);
}
