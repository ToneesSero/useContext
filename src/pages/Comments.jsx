import React, { useState, useEffect, Fragment, useRef } from 'react'

import Card from '../UI/Card/Card'
import Modal from '../UI/Modal/Modal'
import Input from '../UI/Input/Input'

import './../styles/scss/Comments/Comments.css'

export default function Comments() {

  const [isShowModal, setIsShowModal] = useState(false);
  const [paramsFilter, setParamsFilters] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [comments, setComments] = useState();
  const [currentComments, setCurrentComments] = useState(null)
  const selectRef = useRef(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments?start=0&_limit=20')
      .then((res) => res.json())
      .then(data => setComments(data))
  }, []);

  useEffect(() => {
    if (Array.isArray(comments)) {
      comments.forEach(comment => {
        if (!(paramsFilter.includes(comment['postId']))) {
          let array = [...paramsFilter, comment['postId']].sort()
          setParamsFilters(array)
        }
      });
    }
  }, [comments, paramsFilter])

  useEffect(()=>{    
    let newArrayComments = comments
    if (selectedPostId && selectedPostId !== 'null'){                      
      newArrayComments = comments.filter((comment)=>comment['postId'] === selectedPostId)            
    }
    setCurrentComments(newArrayComments)
  },[selectedPostId,comments, selectRef])


  function changeFilters() {
    const select = selectRef.current
    setSelectedPostId(Number(select.value))
  }

  return (
    <Fragment>

      <div className='search'>
        <Input type={"text"} placeholder={'Поиск комментарием по email'}/>

      </div>

      <div className='filters'>
        <button onClick={() => setIsShowModal(true)}>Фильтры</button>
      </div>

      <div className="container" >
        {currentComments?.map((comment) => {
          return (<Card title={comment['name']} text={comment['body']} email={comment['email']} key={comment['id']} />)
        })}
      </div>

      <Modal visible={isShowModal} setVisible={setIsShowModal}>
        <div className='modal__title'>
          <h3>Фильтрация комментариев</h3>
        </div>
        <hr />
        <div className='modal__container'>
          <select ref={selectRef} onChange={()=>{changeFilters()}}>
            <option disabled>По postId</option>
            <option value="null" key="null">Отключить фильтрацию</option>
            {paramsFilter.map((param, index) => {
              return <option value={param} key={index}>PostId = {param}</option>
            })}
          </select>
        </div>
      </Modal>
    </Fragment>


  )
}
