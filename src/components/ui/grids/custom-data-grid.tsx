/** @format */

"use client";

import {
	DataGrid,
	type GridValidRowModel,
	type GridRowSelectionModel,
	type GridColDef,
} from "@mui/x-data-grid";
import { useTheme, Box } from "@mui/material";
import { useMemo } from "react";

export interface GridProps {
	data: GridValidRowModel[];
	columns?: GridColDef[];
	pageSize?: number;
	pageSizeOptions?: number[];
	onSelectionChange?: (ids: GridRowSelectionModel) => void;
	height?: string | number;
	disableSelection?: boolean;
	disablePagination?: boolean;
	fullScreen?: boolean;
}

/**
 * Custom Data Grid Component
 * Optimized grid with theme support and flexible configuration
 */
export function Grid({
	data,
	columns: customColumns,
	pageSize = 10,
	pageSizeOptions = [10, 25, 50],
	onSelectionChange,
	height = 600,
	disableSelection = false,
	disablePagination = false,
	fullScreen = false,
}: GridProps) {
	const theme = useTheme();
	const gridHeight = fullScreen ? "100%" : height;

	// Generate columns from data if not provided
	const columns = useMemo(() => {
		if (customColumns?.length) return customColumns;

		if (!data?.length) return [];

		return Object.keys(data[0]).map((key) => ({
			field: key,
			headerName: key
				.replace(/_/g, " ")
				.split(" ")
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
				.join(" "),
			flex: 1,
			minWidth: 120,
			editable: false,
			sortable: true,
			filterable: true,
		})) as GridColDef[];
	}, [data, customColumns]);

	if (!data || data.length === 0) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: gridHeight,
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.text.secondary,
					fontSize: "1rem",
				}}
			>
				No data available
			</Box>
		);
	}

	return (
		<Box
			sx={{
				height: gridHeight,
				width: "100%",
				"& .MuiDataGrid-root": {
					border: `1px solid ${theme.palette.divider}`,
					borderRadius: 0,
					backgroundColor: theme.palette.background.paper,
				},
				"& .MuiDataGrid-cell": {
					color: theme.palette.text.primary,
					borderColor: theme.palette.divider,
					fontSize: "0.875rem",
				},
				"& .MuiDataGrid-columnHeader": {
					backgroundColor: theme.palette.action.hover,
					color: theme.palette.text.primary,
					fontWeight: 600,
					borderColor: theme.palette.divider,
				},
				"& .MuiDataGrid-row": {
					"&:hover": {
						backgroundColor: theme.palette.action.hover,
					},
					"&.Mui-selected": {
						backgroundColor: theme.palette.action.selected,
						"&:hover": {
							backgroundColor: theme.palette.action.selected,
						},
					},
				},
				"& .MuiTablePagination-root": {
					color: theme.palette.text.primary,
				},
				"& .MuiCheckbox-root": {
					color: theme.palette.primary.main,
				},
			}}
		>
			<DataGrid
				rows={data}
				columns={columns}
				initialState={{
					pagination: disablePagination
						? undefined
						: {
							paginationModel: {
								pageSize,
								page: 0,
							},
						},
				}}
				pageSizeOptions={pageSizeOptions}
				checkboxSelection={!disableSelection}
				disableRowSelectionOnClick
				density="comfortable"
				slotProps={{
					pagination: {
						labelRowsPerPage: "Rows per page:",
					},
				}}
				onRowSelectionModelChange={(id) => {
					if (onSelectionChange) {
						onSelectionChange(id);
					}
				}}
			/>
		</Box>
	);
}

export default Grid;
