import React from 'react'
import '../styles/scss/Header/Header.scss'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <div className='header'>
      <nav className='header__nav-bar'>
        <Link to='/' > <p>Главная страница</p> </Link>
        <Link to='posts'>   <p>Posts </p></Link>
        <Link to='comments' >  <p>Comments </p></Link>
        <Link to='albums' >  <p>Albums </p></Link>
        <Link to='photos' >  <p> Photos</p></Link>
        <Link to='todos'  >  <p> Todos</p></Link>
        <Link to='users'  >  <p>Users </p></Link>
      </nav>
    </div>

  )
}
