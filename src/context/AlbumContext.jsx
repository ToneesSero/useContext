import React from 'react'
import { useState, createContext, useEffect } from 'react'

export const albumContext = createContext(null)

export default function AlbumContextProvider({children}) {

    const [albums, setAlbums] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(false)
        fetch('https://jsonplaceholder.typicode.com/albums')
         .then((res) => res.json())
         .then(data => {
            setAlbums(data)
            setLoading(false)                 
         })        
     }, []);

  return (
    <albumContext.Provider value={{albums, loading}}>
        {children}
    </albumContext.Provider>
  )
}
