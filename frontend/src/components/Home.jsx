import { useState, useEffect } from "react"
import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newTodo, setNewTodo] = useState("")
  const navigateTo = useNavigate()

  // helper: get token from localStorage
  const getAuthConfig = () => {
    const token = localStorage.getItem("token")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://todoapp-backend-s5h4.onrender.com/todo/fetch',
          getAuthConfig()
        )
        setTodos(response.data.todos)
        setError(null)
      } catch (error) {
        setError(error.response?.data?.message || error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const todoCreate = async () => {
    if (!newTodo) {
      alert("Please enter a todo")
      return
    }
    try {
      const response = await axios.post(
        'https://todoapp-backend-s5h4.onrender.com/todo/create',
        { title: newTodo, completed: false },
        getAuthConfig()
      )
      setTodos([...todos, response.data.newTodo])
      setNewTodo("")
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    }
  }

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id)
    try {
      const response = await axios.put(
        `https://todoapp-backend-s5h4.onrender.com/todo/update/${id}`,
        { ...todo, completed: !todo.completed },
        getAuthConfig()
      )
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)))
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    }
  }

  const todoDelete = async (id) => {
    try {
      await axios.delete(
        `https://todoapp-backend-s5h4.onrender.com/todo/delete/${id}`,
        getAuthConfig()
      )
      setTodos(todos.filter((t) => t._id !== id))
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    }
  }

  const logout = async () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully")
    navigateTo("/login")
  }

  const todoCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="bg-gray-200 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          className="flex-grow p-2 rounded-l-md focus:outline-none bg-gray-100"
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && todoCreate()}
        />
        <button
          className="bg-blue-600 py-2 border text-white px-4 rounded-r-md hover:bg-blue-700 font-semibold"
          onClick={todoCreate}
        >
          Add
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todoStatus(todo._id)}
                className="mr-2"
              />
              <span className={todo.completed ? "line-through font-semibold" : "font-semibold"}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => todoDelete(todo._id)}
              className="text-red-500 hover:text-red-800 duration-300 font-semibold cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-sm text-gray-700">
        {todoCount === 0 ? "No todos left 🎉" : `${todoCount} remaining ${todoCount === 1 ? "todo" : "todos"}`}
      </p>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-red-500 hover:bg-red-700 duration-300 mx-auto block cursor-pointer"
      >
        Logout
      </button>
    </div>
  )
}

export default Home
