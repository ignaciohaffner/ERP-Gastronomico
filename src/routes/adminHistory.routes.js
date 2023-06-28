import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { createAdminHistory, deleteAdminHistory, getAdminHistory, updateAdminHistory } from "../controllers/adminHistory.controller.js";

const router = Router()

router.get('/adminhistory/:id', authRequired, getAdminHistory)
// router.get('/adminHistory/:id', authRequired, getTask)
router.post('/adminhistory', authRequired, createAdminHistory)
router.delete('/adminHistory/:id', authRequired, deleteAdminHistory)
router.put('/adminHistory/:id', authRequired, updateAdminHistory)

export default router