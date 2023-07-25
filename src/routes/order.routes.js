import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { getOrder, getOrders, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";
const router = Router()

router.get('/orders', getOrders)
router.get('/orders/:id', getOrder)
router.post('/orders', createOrder)
router.delete('/orders/:id', deleteOrder)
router.put('/orders/:id', updateOrder)

export default router