import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import {getIngredients, getIngredient, createIngredient, deleteIngredient, updateIngredient} from '../controllers/ingredients.controller.js'

const router = Router()

router.get('/ingredients', authRequired, getIngredients)
router.get('/ingredients/:id', authRequired, getIngredient)
router.post('/ingredients', authRequired, createIngredient)
router.delete('/ingredients/:id', authRequired, deleteIngredient)
router.put('/ingredients/:id', authRequired, updateIngredient)

export default router