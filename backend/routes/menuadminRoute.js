import express from 'express';
import { menuadminLogin } from '../controllers/menuadminController.js';

const router = express.Router();

// Route for menuadmin login
router.post('/login', menuadminLogin);

export default router;