import React, { useEffect, useState } from 'react'
import fetchedTodos from "./todos.json"
import "./todo.css"
import Todo from './Todo'

export default function Todos() {
  const [todos, setTodos] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    async function fetchTodos(){
      const response = await fetch("http://localhost:8080/api/todos")
      const data = await response.json()
      console.log("todos", data.data)
      setTodos(data.data)
      setIsloading(false)
    }
    fetchTodos()
  }, [])
  

  if (isLoading){
    return (
      <div>
        <h1>No Todos</h1>
      </div>
    )
  }

  return (
    <div>
        <h1>Todo</h1>
        <div className='todo-list'>
          {todos.map(todo => <Todo key={todo.id} {...todo}/>)}
        </div>

    </div>
  )
}