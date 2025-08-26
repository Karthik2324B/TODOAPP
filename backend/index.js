import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import todoRoute from './routes/todo.route.js'
import userRoute from './routes/user.route.js'

const app = express()
dotenv.config()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "https://todoapp-frontend-54g4.onrender.com", 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

const port = process.env.PORT || 3000
const DB_URI = process.env.MONGODB_URI

// Database connection
try {
  await mongoose.connect(DB_URI)
  console.log('✅ Connected to MongoDB successfully')
} catch (error) {
  console.error('❌ Error connecting to MongoDB:', error)
}

// Routes
app.use("/todo", todoRoute)
app.use("/user", userRoute)

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})
