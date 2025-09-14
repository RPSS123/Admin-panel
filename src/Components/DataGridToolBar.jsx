import React from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { TextField, Box, Button } from "@mui/material";

export default function DataGridToolbar({ search, onSearch, onAdd }) {
  return (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", gap: 2, width: "100%", alignItems: "center" }}>
        <TextField size="small" placeholder="Search…" value={search} onChange={(e)=>onSearch(e.target.value)} />
        <Box sx={{ flexGrow: 1 }} />
        {onAdd && <Button variant="contained" onClick={onAdd}>Add</Button>}
      </Box>
    </GridToolbarContainer>
  );
}
