import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'



export default function Detail_Info({ url, field }) {
    const [currentData, setCurrentData] = useState({})
    const [image, setImage] = useState(null)
    const params = useParams()
    
    useEffect(() => {
        fetch(url + `?${field}=${params[field]}`)
            .then((res) => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCurrentData(data[0])
                    
                }
            })
    }, [params, field, url])

    useEffect(()=>{
        if (Object.keys(currentData).includes('thumbnailUrl')) {
            setImage(currentData['thumbnailUrl'])
        }
    },[currentData])

    return (
        <div>
            {Object.keys(currentData).map((obj, index) => {
                return (
                    <div key={index}>
                        {obj}: {currentData[obj]}
                    </div>

                )
            })}
            {image &&(
                <img src={image} alt='img'/>                 
            )}
        </div>
    )
}
