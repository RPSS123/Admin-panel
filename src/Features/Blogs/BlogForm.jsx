import React, { useEffect } from "react";
import { Box, Button, Grid, TextField, Switch, FormControlLabel } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createBlog, getBlog, updateBlog, publishBlog } from "../../API/blogs";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object({
  title: yup.string().required().max(160),
  slug:  yup.string().required().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: yup.string().max(400).nullable(),
  contentHtml: yup.string().nullable(),
});

export default function BlogForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const isEdit = id !== "new";

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { title: "", slug: "", excerpt: "", contentHtml: "", imageUrl: "", isDisplay: true, status: "Draft" },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isEdit) {
      getBlog(id).then((d) => {
        Object.entries(d).forEach(([k, v]) => setValue(k, v ?? ""));
      });
    }
  }, [id, isEdit, setValue]);

  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  useEffect(() => {
    const t = watch("title");
    if (!isEdit) setValue("slug", slugify(t || ""));
    // eslint-disable-next-line
  }, [watch("title")]);

  const onSubmit = async (form) => {
    if (isEdit) await updateBlog(id, form); else await createBlog(form);
    nav("/blogs");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:"grid", gap:2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Controller name="title" control={control} render={({ field }) => (
            <TextField label="Title" fullWidth {...field} />
          )}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller name="slug" control={control} render={({ field }) => (
            <TextField label="Slug" fullWidth {...field} />
          )}/>
        </Grid>
      </Grid>

      <Controller name="excerpt" control={control} render={({ field }) => (
        <TextField label="Excerpt" multiline rows={2} {...field} />
      )}/>

      <Controller name="contentHtml" control={control} render={({ field }) => (
        <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
      )}/>

      <FormControlLabel control={<Controller name="isDisplay" control={control} render={({ field }) => (
        <Switch checked={field.value} onChange={(e)=>field.onChange(e.target.checked)} />
      )} />} label="Visible" />

      <Box sx={{ display:"flex", gap:2 }}>
        <Button type="submit" variant="contained">Save</Button>
        {isEdit && <Button onClick={async()=>{ await publishBlog(id); nav("/blogs"); }} variant="outlined">Publish</Button>}
        <Button variant="text" onClick={()=>nav(-1)}>Cancel</Button>
      </Box>
    </Box>
  );
}
