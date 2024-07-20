import React from 'react'
import { useState, createContext, useEffect } from 'react'

export const usersContext = createContext(null)

export default function UsersContextProvider({children}) {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(false)
        fetch('https://jsonplaceholder.typicode.com/users')
         .then((res) => res.json())
         .then(data => {
            setUsers(data)
            setLoading(false)  
            console.log(data);                        
         })        
     }, []);

  return (
    <usersContext.Provider value={{users, loading}}>
        {children}
    </usersContext.Provider>
  )
}
