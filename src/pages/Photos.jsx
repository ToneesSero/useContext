import React, { useState, useEffect } from 'react'
import Card from '../UI/Card/Card'
import './../styles/scss/Photos/Photos.scss'

export default function Photos() {

  const [photos, setPhotos] = useState()

  useEffect(() => {
    
    fetch('https://jsonplaceholder.typicode.com/photos?start=0&_limit=20')
      .then((res)=>res.json())
      .then(data=> setPhotos(data))
  }, []);

  return (
    <div className="container" > 
    {photos?.map((photo)=>{
      return (<Card title={photo['title']} imgUrl={photo['url']} key={photo['id']} />)
    })}
      
    </div>
  )
}
