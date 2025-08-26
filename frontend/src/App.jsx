import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Pagenotfound from './components/Pagenotfound'
import { Toaster } from 'react-hot-toast'

function App() {
  const token = localStorage.getItem("jwt")

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
