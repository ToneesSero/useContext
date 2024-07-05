import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useFilter } from '../hooks/useFilter'

import Card from '../UI/Card/Card'
import Modal from '../UI/Modal/Modal'
import Input from '../UI/Input/Input'

import './../styles/scss/Comments/Comments.css'

export default function Comments() {

  const [isShowModalFilter, setIsShowModalFilter] = useState(false);
  const [isShowModalSort, setIsShowModalSort] = useState(false);
  const [paramsFilter, setParamsFilters] = useState([]);
  const [sortParam, setSortParam] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [query, setQuery] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState();
  const [currentComments, setCurrentComments] = useState(null);
  const [filterComment, queryComment, sortComment] = useFilter();

  const selectFiltersRef = useRef(null);
  const selectSortRef = useRef(null);
  const selectSortDirectionRef = useRef(null)


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

  useEffect(() => {
    let newArrayComments = comments
    newArrayComments = filterComment(newArrayComments, selectedPostId, 'postId')
    newArrayComments = queryComment(newArrayComments, query, 'email')
    newArrayComments = sortComment(newArrayComments, sortParam, sortDirection )
    setCurrentComments(newArrayComments)
  }, [selectedPostId, comments, selectFiltersRef, query, sortParam, sortDirection])


  function changeFilters() {
    const select = selectFiltersRef.current
    setSelectedPostId(Number(select.value))
  }

  function changeSortParam() {
    const select = selectSortRef.current
    setSortParam(select.value)
  }

  function changeSortDirectionParam() {
    const select = selectSortDirectionRef.current
    setSortDirection(select.value)
  }

  return (
    <Fragment>

      <div className='search'>
        <Input type={"text"} placeholder={'Поиск комментарием по email'} value={query} onChange={(e) => { setQuery(e.target.value) }} />

      </div>

      <div className='filters'>
        <button onClick={() => setIsShowModalFilter(true)}>Фильтры</button>
      </div>

      <div className='filters'>
        <button onClick={() => setIsShowModalSort(true)}>Сортировка</button>
      </div>

      <div className="container" >
        {currentComments?.map((comment) => {
          return (<Card title={comment['name']} text={comment['body']} email={comment['email']} key={comment['id']} />)
        })}
      </div>

      <Modal visible={isShowModalFilter} setVisible={setIsShowModalFilter}>
        <div className='modal__title'>
          <h3>Фильтрация комментариев</h3>
        </div>
        <hr />
        <div className='modal__container'>
          <select ref={selectFiltersRef} onChange={() => { changeFilters() }}>
            <option disabled>По postId</option>
            <option value="null" key="null">Отключить фильтрацию</option>
            {paramsFilter.map((param, index) => {
              return <option value={param} key={index}>PostId = {param}</option>
            })}
          </select>
        </div>
      </Modal>

      <Modal visible={isShowModalSort} setVisible={setIsShowModalSort}>
        <div className='modal__title'>
          <h3>Сортировка комментариев</h3>
        </div>
        <hr />
        <div className='modal__container'>
          <p>Сортировка</p>
          <select ref={selectSortRef} onChange={() => { changeSortParam() }}>
            <option disabled value='null' key='null'>Сортировка: </option>
            <option value="name" key="name">По имени</option>
            <option value="email" key="email">По почте</option>
          </select>

          <p>Настройки сортировки</p>
          <select ref={selectSortDirectionRef} onChange={() => { changeSortDirectionParam() }}>            
            <option value="asc" key="asc" selected>По возрастанию</option>
            <option value="desc" key="desc">По убыванию</option>
          </select>
        </div>
      </Modal>
    </Fragment>


  )
}
