import React, { useState, useEffect } from 'react'
import Card from '../UI/Card/Card'
import './../styles/scss/Album/Albums.scss'

export default function Albums() {
  const [albums, setAlbums] = useState()

  useEffect(() => {
    console.log('sasaas');
    fetch('https://jsonplaceholder.typicode.com/albums?start=0&_limit=20')
      .then((res)=>res.json())
      .then(data=> setAlbums(data))
  }, []);

  return (
    <div className="container" > 
        {albums?.map((album)=>{
          return (<Card title={album['title']} key={album['id']}/>)
        })}
    </div>
  )
}
