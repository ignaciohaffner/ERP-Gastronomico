import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { getOrder, getOrders, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";
const router = Router()

const orderRoutes = (io) => {
    router.get('/orders', authRequired, getOrders)
router.get('/orders/:id', authRequired, getOrder)
router.post('/orders', authRequired, (req, res) => createOrder(req, res, io))
router.delete('/orders/:id', authRequired, deleteOrder)
router.put('/orders/:id', authRequired, updateOrder)

return router
}


export default orderRoutes