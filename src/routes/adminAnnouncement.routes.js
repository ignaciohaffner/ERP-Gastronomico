import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { createAdminAnnouncement, deleteAdminAnnouncement, getAdminAnnouncements, updateAdminAnnouncement } from "../controllers/adminAnnouncement.controller.js";

const router = Router()

router.get('/adminannouncement', authRequired, getAdminAnnouncements)
// router.get('/adminHistory/:id', authRequired, getTask)
router.post('/adminannouncement', createAdminAnnouncement)
router.delete('/adminannouncement/:id', authRequired, deleteAdminAnnouncement)
router.put('/adminannouncement/:id', authRequired, updateAdminAnnouncement)

export default router