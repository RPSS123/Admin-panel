import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { listPages, deletePage } from "../../API/pages";
import DataGridToolbar from "../../Components/DataGridToolBar";

export default function PageList() {
  const nav = useNavigate();
  const [rows, setRows] = useState([]), [total, setTotal] = useState(0);
  const [page, setPage] = useState(0), [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState([{ field: "name", sort: "asc" }]);
  const [search, setSearch] = useState("");

  async function load() {
    const sortBy = sortModel[0]?.field ?? "name";
    const sortDir = sortModel[0]?.sort ?? "asc";
    const data = await listPages({ search, page: page + 1, pageSize, sortBy, sortDir });
    setRows(data.items); setTotal(data.total);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, pageSize, sortModel, search]);

  const cols = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "slug", headerName: "Slug", width: 180 },
    { field: "publishOnWebsite", headerName: "Published", width: 120, type: "boolean" },
    { field: "showInMenu", headerName: "Menu", width: 100, type: "boolean" },
    {
      field: "actions", headerName: "Actions", width: 120, sortable: false,
      renderCell: (p) => (
        <>
          <IconButton onClick={()=>nav(`/pages/${p.row.id}`)}><EditIcon/></IconButton>
          <IconButton onClick={async ()=>{ await deletePage(p.row.id); load(); }}><DeleteIcon/></IconButton>
        </>
      )
    }
  ];

  return (
    <Box height={600}>
      <DataGrid
        rows={rows} columns={cols} getRowId={(r)=>r.id}
        rowCount={total} page={page} pageSize={pageSize}
        pagination paginationMode="server" onPaginationModelChange={(m)=>{setPage(m.page); setPageSize(m.pageSize);}}
        sortingMode="server" sortModel={sortModel} onSortModelChange={setSortModel}
        slots={{ toolbar: DataGridToolbar }} slotProps={{ toolbar: { search, onSearch: setSearch, onAdd: () => nav("/pages/new") } }}
      />
    </Box>
  );
}
