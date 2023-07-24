import axios from "./axios";

export const getFoodsRequest = async () => axios.get("/foods");

export const createFoodRequest = async (food) => axios.post("/foods", food);

export const updateFoodRequest = async (id, food) =>
    axios.put(`/foods/${id}`, food);

export const deleteFoodRequest = async (id) => axios.delete(`/foods/${id}`);

export const getFoodRequest = async (id) => axios.get(`/foods/${id}`);