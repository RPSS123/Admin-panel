import api from "./axios";

export const listPages = (params) => api.get("/pages", { params }).then(r => r.data);
export const getPage = (id) => api.get(`/pages/${id}`).then(r => r.data);
export const createPage = (data) => api.post("/pages", data).then(r => r.data);
export const updatePage = (id, data) => api.put(`/pages/${id}`, { ...data, id }).then(r => r.data);
export const deletePage = (id) => api.delete(`/pages/${id}`);
