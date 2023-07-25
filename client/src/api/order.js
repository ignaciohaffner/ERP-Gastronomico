import axios from "./axios";

export const getOrdersRequest = async () => axios.get("/orders");

export const createOrderRequest = async (order) => {
    axios.post("/orders", order);
    console.log('la concha de mi madre')
}

export const updateOrderRequest = async (id, order) =>
    axios.put(`/orders/${id}`, order);

export const deleteOrderRequest = async (id) => axios.delete(`/orders/${id}`);

export const getOrderRequest = async (id) => axios.get(`/orders/${id}`);