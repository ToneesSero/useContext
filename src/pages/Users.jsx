import React, { useState, useEffect } from 'react'
import Card from '../UI/Card/Card'
import './../styles/scss/Users/Users.scss'

export default function Users() {
  const [users, setUsers] = useState()

  useEffect(() => {
    console.log('sasaas');
    fetch('https://jsonplaceholder.typicode.com/users?start=0&_limit=20')
      .then((res)=>res.json())
      .then(data=> setUsers(data))
  }, []);

  return (
    <div className="container" > 
        {users?.map((user)=>{
          return (<Card text={user['name']} key={user['id']} email={user['email']}/>)
        })}
    </div>
  )
}
