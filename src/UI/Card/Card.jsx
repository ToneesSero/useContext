import React from 'react'
import { Link } from 'react-router-dom'

import './Card.scss'

export default function Card({ title, text, description, imgUrl, email, link, checkbox, checkboxValue }) {
  return (
    <div className='card'>
      <div className='card__block-text'>

        {
          email
            ? (
              <div className='card-email'>
                <h2>Email:</h2>
                <a href={"mailto:" + email}>{email}</a>
              </div>
            )
            : null
        }

        <div className='title'>
          {
            title
              ? (
                <h2> {title}</h2>
              )
              : null
          }
          {
            checkbox
              ? (
                <div className='card-checkbox'>
                  <label htmlFor='checkbox'>Выполнено:</label>
                  <input type="checkbox" name="checkbox" checked={checkboxValue} onChange={()=>null}/>
                </div>
              )
              : null
          }
        </div>


        {
          text
            ? (
              <div className='card-text'>
                <h4> {text}</h4>
              </div>
            )
            : null
        }


        {
          description
            ? (
              <div className='card-description'>
                <p> {description}</p>
              </div>
            )
            : null
        }

        {
          link
            ? (
              <div className='card-description'>
                <Link to={link}><button>Подробнее</button></Link>
              </div>
            )
            : null
        }

      </div>


      {
        imgUrl
          ? (
            <div className='card__block-img'>
              <img src={imgUrl} alt='img' />
            </div>
          )
          : null
      }

    </div>
  )
}
