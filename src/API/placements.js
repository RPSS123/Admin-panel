import api from "./axios";

export const listPlacements = (params) => api.get("/placements", { params }).then(r => r.data);
export const getPlacement = (id) => api.get(`/placements/${id}`).then(r => r.data);
export const createPlacement = (data) => api.post("/placements", data).then(r => r.data);
export const updatePlacement = (id, data) => api.put(`/placements/${id}`, { ...data, id }).then(r => r.data);
export const deletePlacement = (id) => api.delete(`/placements/${id}`);
