import React, { useState, useEffect } from 'react'
import Card from '../UI/Card/Card'
import './../styles/scss/Todos/Todos.scss'

export default function Todos() {
  const [todos, setTodos] = useState()

  useEffect(() => {
    console.log('sasaas');
    fetch('https://jsonplaceholder.typicode.com/todos?start=0&_limit=20')
      .then((res)=>res.json())
      .then(data=> setTodos(data))
  }, []);

  return (
    <div className="container" > 
        {todos?.map((todo)=>{
          return (<Card text={todo['title']} key={todo['id']}/>)
        })}
    </div>
  )
}
