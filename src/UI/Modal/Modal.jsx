import React from 'react'
import './Modal.scss'

export default function Modal({ children, visible, setVisible }) {   
    
    function closeModal(e){
        e.preventDefault()
        e.stopPropagation()
        setVisible(false)
    }

    let classesModal = 'modal'
    if(visible){
        classesModal += ' active'
    }

    return (

        <div className={classesModal} onClick={(e)=>closeModal(e)}>
            <div className='modal__content' onClick={(e)=>e.stopPropagation()}>
                <div className='modal__close' onClick={(e)=>closeModal(e)}>X</div>
                {children}
            </div>
        </div>
    )
}
