import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigateTo = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('https://todoapp-backend-s5h4.onrender.com/user/login', {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })

      
      toast.success(data.message || "Logged in successfully")
      localStorage.setItem("jwt", data.token)
      console.log("Token received:", data.token);
      console.log("Navigating to home...");
      navigateTo("/home");
      console.log("Should have navigated now");
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error("Error during login:", error)
      toast.error(error?.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-2xl space-y-6'>
        <h2 className='text-4xl font-bold text-center text-blue-500'>Login</h2>

        <form className='space-y-4' onSubmit={handleLogin}>
          <div>
            <label htmlFor='Email' className='block mb-2 text-lg text-gray-700 font-semibold'>
              Email:
            </label>
            <input
              type="email"
              id="Email"
              placeholder='Enter your email'
              className='w-full p-2 border border-gray-300 focus:outline-none rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='Password' className='block mb-2 text-lg text-gray-700 font-semibold'>
              Password:
            </label>
            <input
              type="password"
              id="Password"
              placeholder='Enter your password'
              className='w-full p-2 border border-gray-300 focus:outline-none rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="current-password"
            />
          </div>

          <button
            type="submit"
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 font-semibold cursor-pointer'
          >
            Login
          </button>
        </form>

        <p className='text-center text-gray-600 italic'>
          New User? <Link to="/signup" className='text-blue-500 not-italic hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
