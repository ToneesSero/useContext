import React, { useState, useEffect, Fragment, useRef, useContext } from 'react'
import { useFilter } from '../hooks/useFilter'
import { usePagination } from '../hooks/usePagination'
import { albumContext } from '../context/AlbumContext'


import Card from '../UI/Card/Card'
import './../styles/scss/Album/Albums.scss'
import Input from '../UI/Input/Input'

export default function Albums() {

  const { albums, loading } = useContext(albumContext);
  const [currentAlbums, setCurrentAlbums] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsVisible, setAlbumsVisible] = useState([])

  const [query, setQuery] = useState('');

  const [, queryPosts] = useFilter();
  const [setPage, getArrayPages, countPages] = usePagination(albums, 20)
  const [arrayPages, setArrayPages] = useState([])
  const [searchPage, setSearchPage] = useState('')  

  // Определяет какие страницы будут показываться в пагинации
  useEffect(() => {
    setArrayPages(getArrayPages(currentPage))
  }, [countPages, currentPage])

  // При изменении страницы получаем нужные данные и сбрасываем фильтры
  useEffect(() => {
    setCurrentAlbums(setPage(currentPage));
    setAlbumsVisible(currentAlbums);
  }, [albums, currentPage])

  // Изменение показывающихся данных в зависимости с параметрами поиска, сортировки и фильтрации
  useEffect(() => {
    let newArrayAlbums = currentAlbums
    if (query) {
      newArrayAlbums = queryPosts(newArrayAlbums, query, 'title')
    }
    setAlbumsVisible(newArrayAlbums)
  }, [currentAlbums, query])

  function changeSearchPage(value) {
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
          {arrayPages?.map((numPage) => {
            return (<button className={Number(numPage) === Number(currentPage) ? 'active__pagination' : ''} key={numPage} onClick={() => setCurrentPage(numPage)} >{numPage}</button>)
          })}
          <input type="text" onChange={(e) => changeSearchPage(e.target.value)} value={searchPage} placeholder='Введите страницу' />
        </div>

        <div className='search'>
          <Input type={"text"} placeholder={'Поиск постов по title'} value={query} onChange={(e) => { setQuery(e.target.value) }} />

        </div>

        <div className="container" >
          {albumsVisible?.map((album) => {
            return (<Card title={album['title']} key={album['id']} link={`/albums/${album['id']}`}/>)
          })}
        </div>

      </Fragment>


    )
  }
  else {
    return (<Fragment>Загрузка...</Fragment>)
  }
}
