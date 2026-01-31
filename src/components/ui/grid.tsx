/** @format */

"use client";

import Box from "@mui/material/Box";
import { DataGrid, GridValidRowModel, GridRowSelectionModel } from "@mui/x-data-grid";

interface GridProps {
  data: GridValidRowModel[];
  onSelectionChange?: (ids: GridRowSelectionModel) => void;
}

export function Grid({ data, onSelectionChange }: GridProps) {
  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 150,
    editable: true,
  }));

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        showToolbar
        onRowSelectionModelChange={(id) => {
          console.log("Selected IDs:", id);
          if (onSelectionChange) {
            onSelectionChange(id);
          }
        }}
      />
    </Box>
  );
}
