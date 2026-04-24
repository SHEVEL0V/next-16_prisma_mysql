/** @format */

"use client";

import { CircularProgress, Tooltip, IconButton } from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";

export default function AddButton({
	isPending,
	title,
}: {
	isPending: boolean;
	title?: string;
}) {
	return (
		<Tooltip title={title} placement="right">
			<IconButton
				type="submit"
				color="primary"
				disabled={isPending}
				sx={{ p: "8px" }}
			>
				{isPending ? (
					<CircularProgress size={28} />
				) : (
					<AddBoxIcon fontSize="large" />
				)}
			</IconButton>
		</Tooltip>
	);
}
