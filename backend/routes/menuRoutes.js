import express from 'express';
import { addMenu, deleteMenuItem, getMenuItems, getMenuStats, toggleAvailability, updatePrice } from '../controllers/menuController.js';
import verifyAdminToken  from '../middlewares/authAdmin.js';
import authAdminOrSubadmin from '../middlewares/authAdminOrSubadmin.js';
import authAllAdmins from '../middlewares/authAllAdmins.js';

const router = express.Router();

// Menu item routes
router.get('/menu-items',authAllAdmins, getMenuItems);
router.get('/menu-itemss', getMenuItems);
router.post('/add', authAdminOrSubadmin, addMenu);
router.post('/change-availability',authAllAdmins, toggleAvailability);
router.post('/update-price', verifyAdminToken, updatePrice);
router.delete('/delete/:menuId', verifyAdminToken, deleteMenuItem);
router.get('/menu-stats', getMenuStats);


export default router; 