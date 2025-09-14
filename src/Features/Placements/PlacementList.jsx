import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { listPlacements, deletePlacement } from "../../API/placements";
import DataGridToolbar from "../../Components/DataGridToolBar";

export default function PlacementList() {
  const nav = useNavigate();
  const [rows, setRows] = useState([]);

  async function load() {
    const data = await listPlacements({});
    setRows(data);
  }
  useEffect(()=>{ load(); }, []);

  const cols = [
    { field: "position", headerName: "Position", width:120 },
    { field: "pathPattern", headerName: "Path Pattern", flex:1 },
    { field: "contentType", headerName: "Type", width:120 },
    { field: "sortOrder", headerName: "Order", width:100 },
    {
      field: "actions", headerName: "Actions", width:120, sortable:false,
      renderCell: (p)=>(
        <>
          <IconButton onClick={()=>nav(`/placements/${p.row.id}`)}><EditIcon/></IconButton>
          <IconButton onClick={async ()=>{ await deletePlacement(p.row.id); load(); }}><DeleteIcon/></IconButton>
        </>
      )
    }
  ];

  return (
    <Box height={600}>
      <DataGrid rows={rows} columns={cols} getRowId={(r)=>r.id}
        slots={{ toolbar: DataGridToolbar }} slotProps={{ toolbar: { search:"", onSearch: ()=>{}, onAdd: ()=>nav("/placements/new") } }}
      />
    </Box>
  );
}
