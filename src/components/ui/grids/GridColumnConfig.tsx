/** @format */

import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

/**
 * Grid Column Configuration Types
 */
export interface ColumnConfig {
  field: string;
  headerName: string;
  width?: number;
  minWidth?: number;
  flex?: number;
  editable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (params: GridRenderCellParams) => React.ReactNode;
}

/**
 * Create column definitions from config
 */
export const createColumnDefs = (columns: ColumnConfig[]): GridColDef[] => {
  return columns.map((col) => ({
    field: col.field,
    headerName: col.headerName,
    width: col.width,
    minWidth: col.minWidth ?? 120,
    flex: col.flex ?? 1,
    editable: col.editable ?? false,
    sortable: col.sortable ?? true,
    filterable: col.filterable ?? true,
    renderCell: col.renderCell,
  }));
};

/**
 * Auto-generate column definitions from data
 */
export const autoGenerateColumns = (
  data: Record<string, unknown>[],
  exclude: string[] = ["id"],
): GridColDef[] => {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0])
    .filter((key) => !exclude.includes(key))
    .map((key) => ({
      field: key,
      headerName: key
        .replace(/_/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      flex: 1,
      minWidth: 120,
      sortable: true,
      filterable: true,
    }));
};

const columnConfigExports = { createColumnDefs, autoGenerateColumns };
export default columnConfigExports;
