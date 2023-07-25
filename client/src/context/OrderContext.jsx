import { createContext, useContext } from 'react'
import { useState } from 'react'
import { getOrderRequest, getOrdersRequest, deleteOrderRequest, updateOrderRequest, createOrderRequest } from '../api/order'

const OrderContext = createContext()

export const useOrder = () => {
    const context = useContext(OrderContext)

    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }

    return context
}

export function OrderProvider({ children }) {

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        try {
            const res = await getOrdersRequest()
            setOrders(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createOrder = async (order) => {

        const res = await createOrderRequest(order)
        console.log(res) 
        getOrders()
    }

    const deleteOrder = async (id) => {
        try {
            const res = await deleteOrderRequest(id)
            if (res.status === 204) setOrders(orders.filter(order => order._id != id))
        } catch (error) {
            console.log(error)
        }

    }

    const getOrder = async (id) => {
        try {
            const res = await getOrderRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateOrder = async (id, order) => {
        try {
            await updateOrderRequest(id, order)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <OrderContext.Provider value={{
            orders,
            createOrder,
            getOrders,
            deleteOrder,
            getOrder,
            updateOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}