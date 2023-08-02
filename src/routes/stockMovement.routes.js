import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { createStockMovement, deleteStockMovement, getStockMovement, getStockMovements, updateStockMovement } from "../controllers/stockMovement.controller.js";

const router = Router()

router.get('/stock-movements', authRequired, getStockMovements)
router.get('/stock-movements/:id', authRequired, getStockMovement)
router.post('/stock-movements', authRequired, createStockMovement)
router.delete('/stock-movements/:id', authRequired, deleteStockMovement)
router.put('/stock-movements/:id', authRequired, updateStockMovement)

export default router