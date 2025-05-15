import express from 'express';
import {addMenuadmin, addSubadmin, adminLogin, getSubadmins} from '../controllers/adminController.js';
import { addMenu, updatePrice } from '../controllers/menuController.js';
import authAdmin from '../middlewares/authAdmin.js';
import authAdminOrSubadmin from '../middlewares/authAdminOrSubadmin.js';

const router = express.Router();

// Route for admin login
router.post('/login', adminLogin);

// Route for adding a new sub-admin
router.post('/add-subadmin', authAdmin, addSubadmin);

// Route for adding new menuadmin
router.post('/add-menuadmin', authAdmin, addMenuadmin);

// Route for adding a new menu item
router.post('/add-menu', authAdmin, addMenu);

//route to change availability of menu item
// router.post('/change-availability', toggleAvailability);

// Route to update menu item price
router.post('/update-price', authAdminOrSubadmin, updatePrice);
// Route to get total sub admins
router.get('/subadmins/count', getSubadmins);

export default router; 