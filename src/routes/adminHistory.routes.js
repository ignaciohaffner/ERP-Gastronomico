import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { verifyRole } from "../middlewares/validateRole.js";
import { createAdminHistory, getAdminHistory } from "../controllers/adminHistory.controller.js";

const router = Router()

router.get('/adminhistory', authRequired, getAdminHistory)
// router.get('/adminHistory/:id', authRequired, getTask)
router.post('/adminhistory', authRequired, createAdminHistory)
// router.delete('/adminHistory/:id', authRequired, verifyRole('manager'), deleteTask)
// router.put('/adminHistory/:id', authRequired, updateTask)

export default router