import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { getFood, getFoods, createFood, updateFood, deleteFood } from "../controllers/food.controller.js";

const router = Router()

router.get('/foods', authRequired, getFoods)
router.get('/foods/:id', authRequired, getFood)
router.post('/foods', authRequired, createFood)
router.delete('/foods/:id', authRequired, deleteFood)
router.put('/foods/:id', authRequired, updateFood)

export default router