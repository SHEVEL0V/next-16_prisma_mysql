/** @format */

import React from "react";
import { DashboardGrid } from "@/components/ui/grids";
import Container from "@mui/material/Container";

const card = [
	{ name: "Дошка", link: "/board" },
	{ name: "Список завдань", link: "/task" },
];

export default function Menu() {
	return (
		<Container maxWidth="xl">
			<DashboardGrid menu={card} />
		</Container>
	);
}
