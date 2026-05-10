/** @format */
"use client";
import type React from "react";
import { memo, useState, useTransition, useCallback } from "react";
import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	CircularProgress,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface MoreButtonProps {
	onEdit: () => void;
	id: string;
	deleteAction: (payload: FormData) => void;
}

function MoreButton({
	onEdit,
	id,
	deleteAction,
}: MoreButtonProps) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isPending, startTransition] = useTransition();

	const open = Boolean(anchorEl);

	// Open menu
	const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	}, []);

	// Close menu
	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	// Edit handler with menu close
	const handleEdit = useCallback(() => {
		onEdit();
		handleClose();
	}, [onEdit, handleClose]);

	// Delete handler with form data
	const handleDelete = useCallback(() => {
		startTransition(async () => {
			const formData = new FormData();
			formData.append("id", id);
			await deleteAction(formData);
		});
	}, [id, deleteAction]);

	return (
		<>
			<IconButton
				size="small"
				onClick={handleOpen}
				aria-controls={open ? "action-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				disabled={isPending}
			>
				{isPending ? (
					<CircularProgress size={20} color="inherit" />
				) : (
					<MoreHorizIcon fontSize="small" />
				)}
			</IconButton>

			<Menu
				id="action-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem onClick={handleEdit} disabled={isPending}>
					<ListItemIcon>
						<EditOutlinedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Редагувати</ListItemText>
				</MenuItem>

				<MenuItem onClick={handleDelete} disabled={isPending} color="error">
					<ListItemIcon>
						<DeleteOutlineIcon fontSize="small" color="error" />
					</ListItemIcon>
					<ListItemText>Видалити</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
}

// Мemoize to prevent unnecessary re-renders
export default memo(MoreButton);
