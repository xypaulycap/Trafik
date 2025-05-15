import subadmin from '../models/subadminModel.js';
import menuadmin from '../models/menuAdminModel.js';
import Menu from '../models/menuModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

// Function to validate email format
const validateEmail = (email) => {
    return validator.isEmail(email);
};

// Function to validate password strength
const validatePassword = (password) => {
    return password.length >= 6;
};

//Api for adding subadmin
const addSubadmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Validate password strength
        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if sub-admin already exists
        const existingSubAdmin = await subadmin.findOne({ email });
        if (existingSubAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Sub-admin with this email already exists'
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new sub-admin
        const newSubAdmin = new subadmin({
            name,
            email,
            password: hashedPassword
        });

        // Save the sub-admin
        await newSubAdmin.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Sub-admin created successfully',
            data: {
                id: newSubAdmin._id,
                name: newSubAdmin.name,
                email: newSubAdmin.email,
                role: newSubAdmin.role,
                date: newSubAdmin.date
            }
        });
    } catch (error) {
        console.error('Error creating sub-admin:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating sub-admin',
            error: error.message
        });
    }
};

const addMenuadmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Validate password strength
        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if sub-admin already exists
        const existingMenuAdmin = await menuadmin.findOne({ email });
        if (existingMenuAdmin) {
            return res.status(400).json({
                success: false,
                message: 'menu-admim with this email already exists'
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new sub-admin
        const newMenuAdmin = new menuadmin({
            name,
            email,
            password: hashedPassword
        });

        // Save the sub-admin
        await newMenuAdmin.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Menu-admin created successfully',
            data: {
                id: newMenuAdmin._id,
                name: newMenuAdmin.name,
                email: newMenuAdmin.email,
                role: newMenuAdmin.role,
                date: newMenuAdmin.date
            }
        });
    } catch (error) {
        console.error('Error creating menu-admin:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating menu-admin',
            error: error.message
        });
    }
};

// Api for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Check if credentials match environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate JWT token
            const token = jwt.sign(
                { 
                    email: email,
                    role: 'admin'
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    email: email,
                    role: 'admin',
                    token: token
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
};

//api to get all menu list for admin panel
const getMenu = async (req, res) => {
    try {
        const menuItems = await Menu.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Menu items retrieved successfully',
            menuItems
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching menu items',
            error: error.message
        });
    }
};

//api to get all subadmins
const getSubadmins = async (req, res) => {
    try {
        const count = await subadmin.countDocuments();
        res.status(200).json({
            success: true,
            count,
            message: 'Total sub-admins count retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching subadmins:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching subadmins',
            error: error.message
        });
    }
};
export { addSubadmin, adminLogin, getMenu, getSubadmins, addMenuadmin };