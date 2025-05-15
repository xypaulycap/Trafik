import express from 'express';
import cors from 'cors';// Importing the cors middleware
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import adminRoutes from './routes/adminRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import subadminRoutes from './routes/subadminRoutes.js';
import menuadminRoute from './routes/menuadminRoute.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB()

//middlewares
app.use(express.json())
app.use(cors())// Using the cors middleware to allow cross-origin requests to allow the frontend to access the backend

//api endpoints
app.use('/api/admin', adminRoutes);
app.use('/api/subadmin', subadminRoutes);
app.use('/api/menuadmin', menuadminRoute);
app.use('/api/admin/menu', menuRoutes);
app.use('/api/admin/categories', categoryRoutes);
app.use('/api/admin/inventory', inventoryRoutes);
app.use('/api/order', orderRoutes);
app.get('/', (req, res) => {
    res.send('Api working')
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})