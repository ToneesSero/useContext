import React from 'react'
import './Input.scss'

export default function Input(props) {
  return (
    <div>
        <input className='input' {...props} />
    </div>
  )
}
