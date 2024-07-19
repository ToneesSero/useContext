import React from 'react'
import { useState, createContext, useEffect } from 'react'

export const postsContext = createContext(null)

export default function PostsContextProvider({children}) {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(false)
        fetch('https://jsonplaceholder.typicode.com/posts')
         .then((res) => res.json())
         .then(data => {
            setPosts(data)
            setLoading(false)                      
         })        
     }, [setPosts]);

  return (
    <postsContext.Provider value={{posts, setPosts, loading}}>
        {children}
    </postsContext.Provider>
  )
}
