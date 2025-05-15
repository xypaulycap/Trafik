import subadmin from '../models/subadminModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const validateEmail = (email) => {
    return validator.isEmail(email);
};

// Function to validate password strength
const validatePassword = (password) => {
    return password.length >= 6;
};


const subadminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Basic validation
        if (!email || !password) {
          return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
    
        if (!validateEmail(email)) {
          return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
    
        // Check for subadmin in DB
        const user = await subadmin.findOne({ email });
        if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    
        // Generate JWT
        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );
    
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
          }
        });
    
      } catch (error) {
        console.error('Error during subadmin login:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
      }
};

export {subadminLogin}