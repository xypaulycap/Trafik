import express from 'express';
import http from 'http'; // 👈 for Socket.IO
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import adminRoutes from './routes/adminRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import subadminRoutes from './routes/subadminRoutes.js';
import menuadminRoute from './routes/menuadminRoute.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

// Initialize app and server
const app = express();
const server = http.createServer(app); // 👈 pass app to createServer
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust this for security in production
    methods: ['GET', 'POST', 'PUT'],
  },
});

// Store socket reference globally (or pass it to your route handlers)
app.set('io', io);

const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/subadmin', subadminRoutes);
app.use('/api/menuadmin', menuadminRoute);
app.use('/api/admin/menu', menuRoutes); // 👈 This will emit socket events
app.use('/api/admin/categories', categoryRoutes);
app.use('/api/admin/inventory', inventoryRoutes);
app.use('/api/order', orderRoutes);
app.get('/', (req, res) => {
  res.send('API working');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
