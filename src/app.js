import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import userRoutes from './routes/user.router.js'
import adminHistoryRoutes from './routes/adminHistory.routes.js'
import adminAnnouncementRoutes from './routes/adminAnnouncement.routes.js'

import cors from "cors"



const app = express()

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes)
app.use('/api', taskRoutes)
app.use('/api', userRoutes)
app.use('/api', adminHistoryRoutes)
app.use('/api', adminAnnouncementRoutes)

export default app
