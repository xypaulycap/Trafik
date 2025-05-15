import jwt from 'jsonwebtoken';

//admin auth middleware
const authAdmin = async (req, res, next) => {
    try {
        // Get the token from the request headers
        const { atoken } = req.headers;

        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: 'Authorization denied, login'
            });
        }

        //verify the token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        // Check if the decoded token contains admin role
        if (decoded.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Authorization denied, admin access required'
            });
        }

        // If token is valid, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in admin authentication:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};

export default authAdmin;