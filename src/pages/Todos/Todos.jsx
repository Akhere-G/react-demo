import React, { useEffect, useState } from 'react'
import fetchedTodos from "./todos.json"
import "./todo.css"
import Todo from './Todo'

export default function Todos() {
  const [todos, setTodos] = useState(null)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    async function fetchTodos(){
      setTodos(fetchedTodos)
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
        <div className='todoList'>
          {todos.map(todo => <Todo key={todo.id} {...todo}/>)}
        </div>

    </div>
  )
}