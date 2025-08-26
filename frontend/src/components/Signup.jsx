import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigateTo = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
  
    try {
      const {data}= await axios.post('https://todoapp-backend-s5h4.onrender.com/user/signup', {
        username,
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log(data.message)
      toast.success(data.message|| "Registration successful")
      localStorage.setItem("jwt", data.user.token)
      navigateTo("/login")
      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log("Error during registration:", error)
      toast.error(error.response.data.errors || "Registration failed")
    }
  }

  return (
  <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100'>
  <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-2xl space-y-6'>
    <h2 className='text-4xl font-bold text-center text-blue-500'>Sign Up</h2>

    <form className='space-y-4' onSubmit={handleRegister}>
      <div>
        <label htmlFor='Username' className='block mb-2 text-lg text-gray-700 font-semibold'>
          Username:
        </label>
        <input
          type="text"
          id="Username"
          placeholder='Enter your username'
          className='w-full p-2 border border-gray-300 focus:outline-none rounded'
          value={username}
          onChange={(e) => setUsername(e.target.value)
          }
        />
      </div>

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
        />
      </div>

      <button
        type="submit"
        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 font-semibold cursor-pointer'
      >
        Sign Up
      </button>
    </form>

    <p className='text-center text-gray-600 italic'>
      Already have an account? <Link to="/login" className='text-blue-500 not-italic hover:underline'>Login</Link>
    </p>
  </div>
</div>

  )
}

export default Signup
