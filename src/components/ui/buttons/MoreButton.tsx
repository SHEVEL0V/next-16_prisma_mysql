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



export default function MoreButton({
	onClickEdit,
	onClickDelete,
	isPending = false,
}: {
	onClickEdit: () => void;
	onClickDelete: () => void;
	isPending?: boolean;
}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = useCallback(() => {
		handleClose();
		onClickEdit();
	}, [onClickEdit]);

	const handleDelete = useCallback(() => {
		handleClose();
		onClickDelete();
	}, [onClickDelete]);



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


