import api from "./axios";

export const listBlogs = (params) => api.get("/blogs", { params }).then(r => r.data);
export const getBlog   = (id) => api.get(`/blogs/${id}`).then(r => r.data);
export const createBlog = (data) => api.post("/blogs", data).then(r => r.data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, { ...data, id }).then(r => r.data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
export const publishBlog = (id) => api.patch(`/blogs/${id}/publish`);
