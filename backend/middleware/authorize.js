import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';


export const authenticate = async (req, res, next) => {
  // Check if the request has a valid authentication token
  const token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({ message: 'Unauthoroooooooooooooooooooooized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Decoded token:', decoded);
        req.user = await User.findById(decoded.userId);
        console.log('Authenticated user:', req.user);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
    
    next();
    
}
