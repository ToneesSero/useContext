import React from 'react'
import { useState, createContext, useEffect } from 'react'

export const todosContext = createContext(null)

export default function TodosContextProvider({children}) {

    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(false)
        fetch('https://jsonplaceholder.typicode.com/todos')
         .then((res) => res.json())
         .then(data => {
            setTodos(data)
            setLoading(false)                               
         })        
     }, []);

  return (
    <todosContext.Provider value={{todos, loading}}>
        {children}
    </todosContext.Provider>
  )
}
