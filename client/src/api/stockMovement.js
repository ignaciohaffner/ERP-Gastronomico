import axios from "./axios";

export const getStockMovementsRequest = async () => axios.get("/stock-movements");

export const createStockMovementRequest = async (stockMovement) => axios.post("/stock-movements", stockMovement);


export const updateStockMovementRequest = async (id, stockMovement) => axios.put(`/stock-movements/${id}`, stockMovement);

export const deleteStockMovementRequest = async (id) => axios.delete(`/stock-movements/${id}`);

export const getStockMovementRequest = async (id) => axios.get(`/stock-movements/${id}`);