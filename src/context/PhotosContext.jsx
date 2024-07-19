import React from 'react'
import { useState, createContext, useEffect } from 'react'

export const photosContext = createContext(null)

export default function PhotosContextProvider({ children }) {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(false)
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then(data => {
        setPhotos(data)
        setLoading(false)        
      })
  }, []);

  return (
    <photosContext.Provider value={{ photos, loading }}>
      {children}
    </photosContext.Provider>
  )
}
