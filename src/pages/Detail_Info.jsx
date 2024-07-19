import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



export default function Detail_Info({url, field}) {
    const [currentData, setCurrentData] = useState({})    
    const params = useParams()

    useEffect(() => {
        console.log(params);
        fetch(url+`?${field}=${params[field]}`)
            .then((res) => res.json())
            .then(data => {
                if(Array.isArray(data)){
                    setCurrentData(data[0])                    
                }
            })
    }, [params, field, url])
    return (
        <div>
            {Object.keys(currentData).map((obj,index)=>{
                return (
                    <div key={index}>
                        {obj}: {currentData[obj]}
                    </div>
                )
            })}
        </div>
    )
}
