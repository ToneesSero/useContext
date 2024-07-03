import React, { useState, useEffect } from 'react'
import Card from '../UI/Card/Card'
import './../styles/scss/Posts/Posts.scss'

export default function Posts() {
  const [posts, setPosts] = useState()

  useEffect(() => {
    
    fetch('https://jsonplaceholder.typicode.com/posts?start=0&_limit=20')
      .then((res)=>res.json())
      .then(data=> setPosts(data))
  }, []);

  return (
    <div className="container" > 


    {posts?.map((post)=>{
      return (<Card title={post['title']} text={post['body']} img={post['thumbnailUrl ']? post['thumbnailUrl'] : ''} key={post['id']} />)

    })}
          
    </div>
  )
}
