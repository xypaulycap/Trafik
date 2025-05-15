import express from 'express';
import { subadminLogin } from '../controllers/subadminController.js';

const router = express.Router();

// Route for subadmin login
router.post('/login', subadminLogin);

export default router;