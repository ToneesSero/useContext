import React, { useState, useEffect, Fragment, useRef, useContext } from 'react'
import { useFilter } from '../../hooks/useFilter'
import { usePagination } from '../../hooks/usePagination'
import { commentContext } from '../../context/ComentContext'

import Card from '../../UI/Card/Card'
import Modal from '../../UI/Modal/Modal'
import Input from '../../UI/Input/Input'
import '../../styles/scss/Comments/Comments.css'

export default function Comments() {

  const { comments, loading } = useContext(commentContext);
  const [currentComments, setCurrentComments] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  
  const [commentsVisible, setCommentsVisible] = useState([])

  const [isShowModalFilter, setIsShowModalFilter] = useState(false);
  const [isShowModalSort, setIsShowModalSort] = useState(false);
  const [paramsFilter, setParamsFilters] = useState([]);
  const [sortParam, setSortParam] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [query, setQuery] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [filterComment, queryComment, sortComment] = useFilter();
  const [setPage,getArrayPages, countPages] = usePagination(comments, 20)
  const [arrayPages, setArrayPages] = useState([])
  const [searchPage, setSearchPage] = useState('')

  const selectFiltersRef = useRef(null);
  const selectSortRef = useRef(null);
  const selectSortDirectionRef = useRef(null);

  // Определяет какие страницы будут показываться в пагинации
  useEffect(() => {
    setArrayPages(getArrayPages(currentPage))
  }, [countPages, currentPage])

  // При изменении страницы получаем нужные данные и сбрасываем фильтры
  useEffect(() => {
    setCurrentComments(setPage(currentPage));
    setCommentsVisible(currentComments);     
  }, [comments, currentPage])

  // Заполняем подходящие данные под фильтрацию
  useEffect(() => {
    if (Array.isArray(currentComments)) {      
      let arrayParam = [];
      currentComments.forEach(currentComments => {
        if(currentComments['postId']){
            arrayParam.push(currentComments['postId']);
        }
      });
      setParamsFilters(Array.from(new Set(arrayParam)));
    }
  }, [currentComments])

  // Изменение показывающихся данных в зависимости с параметрами поиска, сортировки и фильтрации
  useEffect(() => {
    let newArrayComments = currentComments
    if (selectedPostId) {
      newArrayComments = filterComment(newArrayComments, selectedPostId, 'postId')
    }
    if (query) {
      newArrayComments = queryComment(newArrayComments, query, 'email')
    }
    if (sortParam) {
      newArrayComments = sortComment(newArrayComments, sortParam, sortDirection)
    }
    setCommentsVisible(newArrayComments)
  }, [selectedPostId, currentComments, selectFiltersRef, query, sortParam, sortDirection])


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

  // Ввод страницы через input
  function changeSearchPage(value){
    if (!isNaN(value) && value > 0 && value < countPages) {
      setCurrentPage(Number(value))
    }
    setSearchPage((value))
  }


  if (!loading) {
    return (
      <Fragment>

      <div className='pagination'>
        <h4>Пагинация</h4>
        {arrayPages?.map((numPage)=>{
          return (<button className={Number(numPage) === Number(currentPage)? 'active__pagination':''} key={numPage} onClick={()=>setCurrentPage(numPage)} >{numPage}</button>)
        })}
        <input type="text" onChange={(e)=>changeSearchPage(e.target.value)} value={searchPage} placeholder='Введите страницу'/>
      </div>

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
          {commentsVisible?.map((comment) => {
            return (<Card title={comment['name']} text={comment['body']} email={comment['email']} key={comment['id']} link={`/comments/${comment['id']}`} />)
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
            <select ref={selectSortRef} onChange={() => { changeSortParam() }} defaultValue={'name'}>
              <option disabled value='null' key='null'>Сортировка: </option>
              <option value="name" key="name">По имени</option>
              <option value="email" key="email">По почте</option>
            </select>

            <p>Настройки сортировки</p>
            <select ref={selectSortDirectionRef} onChange={() => { changeSortDirectionParam() }} defaultValue={'asc'}>
              <option value="asc" key="asc" >По возрастанию</option>
              <option value="desc" key="desc">По убыванию</option>
            </select>
          </div>
        </Modal>

      </Fragment>


    )
  }
  else{
    return (<Fragment>Загрузка...</Fragment>)
  }

}
