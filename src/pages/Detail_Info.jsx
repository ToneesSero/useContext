import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import '../styles/scss/Detail_Info/Detail_Info.scss'

export default function Detail_Info({ url, field }) {
    const [currentData, setCurrentData] = useState([])
    const [image, setImage] = useState(null)
    const params = useParams()   
    
    // Получение данных
    useEffect(() => {
        fetch(url + `?${field}=${params[field]}`)
            .then((res) => res.json())
            .then(data => {                
                if (Array.isArray(data) && data.length === 1) {  
                    let allKeysWithValues =   nestedKeys(data[0])                                    
                    setCurrentData(allKeysWithValues);                               
                }
            })
    }, [params, field, url])
// Покащ изображения
    useEffect(()=>{
        if (Array.isArray(currentData) && currentData.length > 0) {
            let el = currentData.filter((el)=>el.includes('thumbnailUrl')) || null
            
            if (el && el[0]){
                setImage(el[0].split('!')[1])
            }            
        }
    },[currentData])

    // Получение всех полей объекта (даже вложенных) в формате key.nestedKey!value
    function nestedKeys (item, pre = []) {
        if (Array.isArray(item)) {
            return []
        }
        else if (Object(item) === item){
            return Object.entries(item).flatMap(([key,value])=> nestedKeys(value, [...pre, key]))
        }
        else{
            return pre.join('.') + `!${item}`
        }
    }

    return (
        <div className='text-container'>
            {currentData.map((value, index) => {       
                let [key, val] = value.split('!')                         
                return (
                    <div key={index} className='text-block'>
                        <p>{key}:      {val}</p>                                    
                    </div>

                )
            })}
            {image &&(
                <img src={image} alt='img'/>                 
            )}
        </div>
    )
}
