import axios from "./axios";

export const getAdminHistoriesRequest = async (id) => axios.get(`/adminhistory/${id}`);

export const createAdminHistoryRequest = async (task) => axios.post("/adminhistory", task);

// export const updateAdminHistoryRequest = async (id, task) =>
//     axios.put(`/adminhistory/${id}`, task);

// export const deleteAdminHistoryRequest = async (id) => axios.delete(`/adminhistory/${id}`);

// export const getAdminHistoryRequest = async (id) => axios.get(`/adminhistory/${id}`);