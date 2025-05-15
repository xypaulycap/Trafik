import express from 'express';
import verifyAdminToken from '../middlewares/authAdmin.js';
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  addSubcategory,
  deleteSubcategory
} from '../controllers/categoryController.js';
import authAdminOrSubadmin from '../middlewares/authAdminOrSubadmin.js';

const router = express.Router();

// Get all categories
router.get('/', authAdminOrSubadmin, getAllCategories);

// Add a new category
router.post('/', authAdminOrSubadmin, addCategory);

// Delete a category
router.delete('/:id', authAdminOrSubadmin, deleteCategory);

// Subcategory routes
router.post('/:categoryId/subcategories', authAdminOrSubadmin, addSubcategory);
router.delete('/:categoryId/subcategories/:id', authAdminOrSubadmin, deleteSubcategory);

const categoryRoutes = router;
export default categoryRoutes; 