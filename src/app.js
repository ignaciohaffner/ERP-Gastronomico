import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from "cors"; // Mueve la importación de cors arriba

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.router.js';
import adminHistoryRoutes from './routes/adminHistory.routes.js';
import adminAnnouncementRoutes from './routes/adminAnnouncement.routes.js';
import foodRoutes from './routes/food.routes.js';
import orderRoutes from './routes/order.routes.js';
import ingredientRoutes from './routes/ingredient.routes.js'

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:4001'],
      credentials: true,
    },
  });
const port = 4001;
server.listen(port, () => {
  console.log(`Servidor WebSocket iniciado en http://localhost:${port}`);
});

io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Handle other socket events or logic here if needed
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4001'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);
app.use('/api', adminHistoryRoutes);
app.use('/api', adminAnnouncementRoutes);
app.use('/api', foodRoutes);
app.use('/api', orderRoutes(io));
app.use('/api', ingredientRoutes)

export default app;