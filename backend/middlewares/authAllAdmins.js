import jwt from 'jsonwebtoken';

const authAllAdmins = async (req, res, next) => {
    try {
        console.log('Request headers:', req.headers);

        // Normalize headers to lowercase keys for reliability
        const headers = Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k.toLowerCase(), v]));

        const token = headers['atoken'] || headers['satoken'] || headers['matoken'];

        console.log('Selected token:', token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization denied, token missing',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check for any allowed role
        if (!['admin', 'subadmin', 'menuadmin'].includes(decoded.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied, invalid role',
            });
        }

        // Attach decoded data to request
        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error in all-admins authentication:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message,
        });
    }
};

export default authAllAdmins;
