import React from 'react'
import { useState, createContext, useEffect } from 'react'

export const commentContext = createContext(null)

export default function CommentContextProvider({children}) {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
         .then((res) => res.json())
         .then(data => {
           setComments(data)
            setLoading(false)
         })        
     }, [setComments]);

  return (
    <commentContext.Provider value={{comments, setComments, loading}}>
        {children}
    </commentContext.Provider>
  )
}
