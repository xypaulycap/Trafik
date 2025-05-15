import express from 'express';
import { acceptOrder, deleteOrder, generateOrderCode, getAcceptedOrders, getOrderCode, markOrderAsCompleted, totalSalesComparison, totalSalesToday } from '../controllers/orderController.js';
import verifyToken  from '../middlewares/authAdminOrSubadmin.js';
import authAdmin from '../middlewares/authAdmin.js';


const router = express.Router()

// Route to generate order code and save order to the database
router.post('/code',generateOrderCode);
router.get('/code/:code', verifyToken ,getOrderCode);
router.post('/accept-order',verifyToken, acceptOrder);
router.get('/accepted-orders', verifyToken, getAcceptedOrders);
router.put('/mark-completed/:id', verifyToken, markOrderAsCompleted);
router.get('/sales/today', verifyToken, totalSalesToday);
router.get('/sales/comparison',verifyToken, totalSalesComparison);
router.delete('/order/:id',authAdmin, deleteOrder);

const orderRoutes = router;
export default orderRoutes;