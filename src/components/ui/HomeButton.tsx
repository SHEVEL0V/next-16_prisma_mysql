/** @format */

"use client";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";

export default function ButtonHome() {
	const router = useRouter();

	const name = "user"; // Заміни на реальне ім'я користувача

	return (
		<Tooltip title="Повернутися додому">
			<IconButton
				onClick={() => router.push("/user/" + name + "/menu")}
				color="inherit"
				edge="start"
				sx={{ mr: 1 }}
			>
				<HomeIcon />
			</IconButton>
		</Tooltip>
	);
}
