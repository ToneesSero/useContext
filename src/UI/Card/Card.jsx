import React from 'react'
import './Card.scss'

export default function Card({ title, text, description, imgUrl, email }) {
  return (
    <div className='card'>
      <div className='card__block-text'>

        {
          email
          ?(
            <div className='card-email'>
              <h2>Email:</h2>
              <a href={"mailto:"+email}>{email}</a>
            </div>
          )
          : null
        }

        {
          title
            ? (
              <div className='card-title'>
                <h2> {title}</h2>
              </div>
            )
            : null
        }

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

      </div>


      {
        imgUrl
          ? (
            <div className='card__block-img'>
              <img src={imgUrl} alt='img'/>
            </div>
          )
          : null
      }

    </div>
  )
}
