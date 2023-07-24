import axios from "./axios";

export const getAdminAnnouncementsRequest = async () => axios.get(`/adminannouncement/`);

export const createAdminAnnouncementRequest = async (adminannouncement) => axios.post("/adminannouncement", adminannouncement);

export const updateAdminAnnouncementRequest = async (id, task) =>
    axios.put(`/adminannouncement/${id}`, task);

export const deleteAdminAnnouncementRequest = async (id) => axios.delete(`/adminannouncement/${id}`);

// export const getAdminHistoryRequest = async (id) => axios.get(`/adminhistory/${id}`);