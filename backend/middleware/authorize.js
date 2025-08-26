import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const authenticate = async (req, res, next) => {
  try {
    // 1. Read the token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);

    // 4. Find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("Authenticated user:", user);

    // 5. Continue
    next();

  } catch (error) {
    return res.status(401).json({ message: error.message || "Invalid token" });
  }
};
