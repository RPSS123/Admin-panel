import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { listBlogs, deleteBlog } from "../../API/blogs";
import DataGridToolbar from "../../Components/DataGridToolBar";

export default function BlogList() {
  const nav = useNavigate();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState([{ field: "createdAt", sort: "desc" }]);
  const [search, setSearch] = useState("");

  async function load() {
    const sortBy = sortModel[0]?.field ?? "createdAt";
    const sortDir = sortModel[0]?.sort ?? "desc";
    const data = await listBlogs({ search, page: page + 1, pageSize, sortBy, sortDir });
    setRows(data.items);
    setTotal(data.total);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, pageSize, sortModel, search]);

  const cols = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "slug", headerName: "Slug", width: 180 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "createdAt", headerName: "Created", width: 170, valueGetter: p => new Date(p.value).toLocaleString() },
    {
      field: "actions", headerName: "Actions", width: 120, sortable: false,
      renderCell: (p) => (
        <Box>
          <IconButton onClick={() => nav(`/blogs/${p.row.id}`)}><EditIcon/></IconButton>
          <IconButton onClick={async ()=>{ await deleteBlog(p.row.id); load(); }}><DeleteIcon/></IconButton>
        </Box>
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
        slots={{ toolbar: DataGridToolbar }} slotProps={{ toolbar: { search, onSearch: setSearch, onAdd: () => nav("/blogs/new") } }}
      />
    </Box>
  );
}