import axios from "./axios";

export const getIngredientsRequest = async () => axios.get("/ingredients");

export const createIngredientRequest = async (ingredient) => axios.post("/ingredients", ingredient);

export const updateIngredientRequest = async (id, ingredient) =>
    axios.put(`/ingredients/${id}`, ingredient);

export const deleteIngredientRequest = async (id) => axios.delete(`/ingredients/${id}`);

export const getIngredientRequest = async (id) => axios.get(`/ingredients/${id}`);