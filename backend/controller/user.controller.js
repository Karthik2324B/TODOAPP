import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenandSaveInCookie } from "../jwt/token.js";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// signup function
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ errors: "All fields are required" });
  }
  // Validate input using zod
  const Validate = userSchema.safeParse({ username, email, password });
  if (!Validate.success) {
    return res
      .status(400)
      .json({ errors: Validate.error.errors.map((err) => err.message) });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ errors: "User already exists" });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  if (newUser) {
    // Generate JWT token and save in cookie
    const token = await generateTokenandSaveInCookie(newUser._id, res);
    res
      .status(200)
      .json({ message: "Registered successfully", user: newUser, token });
  }
};

// login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await generateTokenandSaveInCookie(user._id, res);
    res
      .status(200)
      .json({ message: "Login Successful", user: user ,token});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//logout function
export const logout = (req, res) => {
   try {
     res.clearCookie("jwt",{
        path:"/",
     })
     res.status(200).json({ message: "User logged out successfully" });
   } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    
   }
};
