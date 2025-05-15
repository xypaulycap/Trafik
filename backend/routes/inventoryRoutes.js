import express from 'express';
import authAdminOrSubadmin from '../middlewares/authAdminOrSubadmin.js';
import authAdmin from '../middlewares/authAdmin.js'
import { addInventoryItem, allInventoryItems, updateInventoryItem } from '../controllers/inventoryController.js';


const router = express.Router()

router.get('/', allInventoryItems)
router.post('/add-item', addInventoryItem)
router.post('/update-item',authAdmin, updateInventoryItem)

const inventoryRoutes = router
export default inventoryRoutes