/** @format */
import { Box, Typography } from "@mui/material";

interface Props {
	message: string;
}

export default function CenteredMessage({ message }: Props) {
	return (
		<Box
			sx={{
				display: "flex",
				flexGrow: 1,
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
				p: 3,
			}}
		>
			<Typography variant="h6" color="text.secondary" textAlign="center">
				{message}
			</Typography>
		</Box>
	);
}
