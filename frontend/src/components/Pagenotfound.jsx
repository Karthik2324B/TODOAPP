import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 text-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl bg-red-500 px-4 py-2 rounded">404 - Page Not Found</h1>
        <Link to="/" className="text-blue-600 underline hover:text-blue-800">
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}

export default Pagenotfound
