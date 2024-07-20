import React, { useState, useEffect, Fragment, useRef, useContext } from 'react'
import { useFilter } from '../hooks/useFilter'
import { usePagination } from '../hooks/usePagination'
import { postsContext } from '../context/PostsContext'


import Card from '../UI/Card/Card'
import Modal from '../UI/Modal/Modal'
import Input from '../UI/Input/Input'
import './../styles/scss/Posts/Posts.scss'

export default function Posts() {
  const { posts, loading } = useContext(postsContext);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsVisible, setPostsVisible] = useState([])

  const [isShowModalSort, setIsShowModalSort] = useState(false);  
  const [sortParam, setSortParam] = useState('userId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [query, setQuery] = useState('');

  const [, queryPosts, sortPosts] = useFilter();
  const [setPage, getArrayPages, countPages] = usePagination(posts, 20)
  const [arrayPages,  setArrayPages] = useState([])
  const [searchPage, setSearchPage] = useState('')

  const selectSortRef = useRef(null);
  const selectSortDirectionRef = useRef(null);

  // Определяет какие страницы будут показываться в пагинации
  useEffect(() => {
    setArrayPages(getArrayPages(currentPage))
  }, [countPages, currentPage]);

  // При изменении страницы получаем нужные данные
  useEffect(() => {
    setCurrentPosts(setPage(currentPage));
    setPostsVisible(currentPosts);
  }, [posts, currentPage]);

  // Изменение показывающихся данных в зависимости с параметрами поиска, сортировки и фильтрации
  useEffect(() => {
    let newArrayPosts = currentPosts
    if (query) {
      newArrayPosts = queryPosts(newArrayPosts, query, 'title')
    }
    if (sortParam) {
      newArrayPosts = sortPosts(newArrayPosts, sortParam, sortDirection)
    }
    setPostsVisible(newArrayPosts)
  }, [currentPosts, query, sortParam, sortDirection]);

  function changeSortParam() {
    const select = selectSortRef.current
    setSortParam(select.value)
  };

  function changeSortDirectionParam() {
    const select = selectSortDirectionRef.current
    setSortDirection(select.value)
  };

  // Ввод страницы через input
  function changeSearchPage(value) {
    if (!isNaN(value) && value > 0 && value < countPages) {
      setCurrentPage(Number(value))
    }
    setSearchPage((value))
  };

  if (!loading) {
    return (
      <Fragment>

        <div className='pagination'>
          <h4>Пагинация</h4>
          {arrayPages?.map((numPage) => {
            return (<button className={Number(numPage) === Number(currentPage) ? 'active__pagination' : ''} key={numPage} onClick={() => setCurrentPage(numPage)} >{numPage}</button>)
          })}
          <input type="text" onChange={(e) => changeSearchPage(e.target.value)} value={searchPage} placeholder='Введите страницу' />
        </div>

        <div className='search'>
          <Input type={"text"} placeholder={'Поиск постов по titlle'} value={query} onChange={(e) => { setQuery(e.target.value) }} />

        </div>

        <div className='filters'>
          <button onClick={() => setIsShowModalSort(true)}>Сортировка</button>
        </div>

        <div className="container" >
          {postsVisible?.map((post) => {
            return (<Card title={post['title']} text={post['body']} img={post['thumbnailUrl '] ? post['thumbnailUrl'] : ''} key={post['id']} link={`/posts/${post['id']}`}/>)

          })}
        </div>

        <Modal visible={isShowModalSort} setVisible={setIsShowModalSort}>
          <div className='modal__title'>
            <h3>Сортировка постов</h3>
          </div>
          <hr />
          <div className='modal__container'>
            <p>Сортировка</p>
            <select ref={selectSortRef} onChange={() => { changeSortParam() }} defaultValue={'name'}>
              <option disabled value='null' key='null'>Сортировка: </option>
              <option value="userId" key="userId">По userId</option>
              <option value="title" key="title">По title</option>
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
  else {
    return (<Fragment>Загрузка...</Fragment>)
  }
}
