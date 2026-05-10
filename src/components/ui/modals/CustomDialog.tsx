/** @format */
"use client";

import React, { useState, useRef } from "react";
import {
	CircularProgress,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import type { ActionResponse } from "@/types/index";

export default function DialogDelete<T>({
	isPending,
	state,
}: {
	isPending: boolean;
	state: ActionResponse<T>;
}) {
	const [open, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const handleClose = () => !isPending && setOpen(false);

	const handleConfirm = () => {
		// Програмно викликаємо відправку форми
		formRef.current?.requestSubmit();
	};

	// Закриваємо діалог автоматично після успішного видалення
	React.useEffect(() => {
		if (state.success) {
			setOpen(false);
		}
	}, [state.success]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="delete-dialog-title"
		>
			<DialogTitle id="delete-dialog-title">Підтвердіть видалення</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Ви впевнені, що хочете видалити цей елемент? Цю дію неможливо буде
					скасувати.
				</DialogContentText>
				{!state.success && state.message && (
					<Typography
						color="error"
						variant="caption"
						sx={{ mt: 2, display: "block" }}
					>
						{state.message}
					</Typography>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					disabled={isPending}
					variant="outlined"
					color="inherit"
				>
					Скасувати
				</Button>
				<Button
					onClick={handleConfirm}
					disabled={isPending}
					variant="contained"
					color="error"
					autoFocus
					startIcon={
						isPending && <CircularProgress size={14} color="inherit" />
					}
				>
					{isPending ? "Видалення..." : "Видалити"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
