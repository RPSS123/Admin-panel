import React, { useEffect } from "react";
import { Box, Button, Grid, MenuItem, TextField, Switch, FormControlLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createPlacement, getPlacement, updatePlacement } from "../../API/placements";

const positions = ["Bottom","Sidebar","Header"];
const types = ["Page","Blog","External"];

export default function PlacementForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const isEdit = id !== "new";

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { position:"Bottom", pathPattern:"/tools/*", contentType:"Page", pageId:"", blogId:"", externalUrl:"", sortOrder:0, active:true }
  });

  useEffect(()=>{ if(isEdit) getPlacement(id).then(d => Object.entries(d).forEach(([k,v])=>setValue(k,v??""))); },[id,isEdit,setValue]);

  const type = watch("contentType");

  const onSubmit = async (form) => {
    // normalize mutually exclusive fields
    if (form.contentType !== "Page") form.pageId = null;
    if (form.contentType !== "Blog") form.blogId = null;
    if (form.contentType !== "External") form.externalUrl = null;

    if (isEdit) await updatePlacement(id, form); else await createPlacement(form);
    nav("/placements");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:"grid", gap:2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Controller name="position" control={control} render={({field})=>(
            <TextField select label="Position" fullWidth {...field}>
              {positions.map(p=><MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          )}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Controller name="pathPattern" control={control} render={({field})=>(
            <TextField label="Path Pattern" fullWidth helperText="e.g. /tools/merge-pdfs or /tools/*" {...field}/>
          )}/>
        </Grid>
      </Grid>

      <Controller name="contentType" control={control} render={({field})=>(
        <TextField select label="Content Type" {...field}>
          {types.map(t=><MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
      )}/>

      {type === "Page" && (
        <Controller name="pageId" control={control} render={({field})=> <TextField label="Page Id" {...field}/> } />
      )}
      {type === "Blog" && (
        <Controller name="blogId" control={control} render={({field})=> <TextField label="Blog Id" {...field}/> } />
      )}
      {type === "External" && (
        <Controller name="externalUrl" control={control} render={({field})=> <TextField label="External URL" {...field}/> } />
      )}

      <Controller name="sortOrder" control={control} render={({field})=> <TextField type="number" label="Sort Order" {...field}/> } />
      <FormControlLabel control={<Controller name="active" control={control} render={({field})=> <Switch checked={field.value} onChange={(e)=>field.onChange(e.target.checked)} />} />} label="Active" />

      <Box sx={{ display:"flex", gap:2 }}>
        <Button type="submit" variant="contained">Save</Button>
        <Button variant="text" onClick={()=>nav(-1)}>Cancel</Button>
      </Box>
    </Box>
  );
}
