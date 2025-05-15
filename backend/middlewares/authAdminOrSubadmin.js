import jwt from 'jsonwebtoken';

// Middleware to authorize both admin and subadmin
const authAdminOrSubadmin = async (req, res, next) => {
    try {
        console.log('Request headers:', req.headers);
        console.log('aToken:', req.headers['atoken'] || req.headers['aToken']);
        console.log('saToken:', req.headers['satoken'] || req.headers['saToken']);
        
        const token = req.headers['atoken'] || req.headers['aToken'] || 
                     req.headers['satoken'] || req.headers['saToken'];
        
        console.log('Selected token:', token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization denied, token missing',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Allow access only to admin or subadmin
        if (decoded.role !== 'admin' && decoded.role !== 'subadmin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied, admin or subadmin only',
            });
        }

        // Attach decoded data to request for further use if needed
        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error in admin/subadmin authentication:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message,
        });
    }
};

export default authAdminOrSubadmin;
