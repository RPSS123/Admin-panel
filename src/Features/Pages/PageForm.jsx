import React, { useEffect } from "react";
import { Box, Button, Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import ReactQuill from "react-quill";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createPage, getPage, updatePage } from "../../API/pages";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required().max(160),
  slug: yup.string().required().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  redirectUrl: yup.string().url().nullable(),
});

export default function PageForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const isEdit = id !== "new";

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { name:"", slug:"", contentHtml:"", imageUrl:"", publishOnWebsite:false, showInMenu:false, redirectUrl:"", status:"Draft" },
    resolver: yupResolver(schema)
  });

  useEffect(() => { if (isEdit) getPage(id).then(d => Object.entries(d).forEach(([k,v]) => setValue(k, v ?? ""))); }, [id, isEdit, setValue]);

  function slugify(t){ return t.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,""); }
  useEffect(() => { const n=watch("name"); if(!isEdit) setValue("slug", slugify(n||"")); /* eslint-disable-next-line */ }, [watch("name")]);

  const onSubmit = async (form) => { if (isEdit) await updatePage(id, form); else await createPage(form); nav("/pages"); };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:"grid", gap:2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}><Controller name="name" control={control} render={({field})=> <TextField label="Name" fullWidth {...field}/>} /></Grid>
        <Grid item xs={12} md={4}><Controller name="slug" control={control} render={({field})=> <TextField label="Slug" fullWidth {...field}/>} /></Grid>
      </Grid>

      <Controller name="contentHtml" control={control} render={({field})=> <ReactQuill theme="snow" value={field.value} onChange={field.onChange}/> } />

      <Controller name="redirectUrl" control={control} render={({field})=> <TextField label="Redirect URL" fullWidth {...field}/>} />

      <FormControlLabel control={<Controller name="publishOnWebsite" control={control} render={({field})=> <Switch checked={field.value} onChange={(e)=>field.onChange(e.target.checked)} />} />} label="Publish on website"/>
      <FormControlLabel control={<Controller name="showInMenu" control={control} render={({field})=> <Switch checked={field.value} onChange={(e)=>field.onChange(e.target.checked)} />} />} label="Show in menu"/>

      <Box sx={{ display:"flex", gap:2 }}>
        <Button type="submit" variant="contained">Save</Button>
        <Button variant="text" onClick={()=>nav(-1)}>Cancel</Button>
      </Box>
    </Box>
  );
}
