import { Router } from 'express'
import { changePassword } from '../controllers/auth.controller.js'
import { getUsers, deleteUser, updateUser, getUser } from '../controllers/users.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = Router()

router.get('/user', authRequired, getUsers)

router.get('/user/:id', getUser)

router.delete('/user/:id', deleteUser)

router.put('/user/:id', updateUser)

router.put('/changepassword/:id', changePassword)


export default router