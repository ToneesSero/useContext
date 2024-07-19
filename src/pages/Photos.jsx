import React, { useState, useEffect, Fragment, useRef, useContext } from 'react'
import { useFilter } from '../hooks/useFilter'
import { usePagination } from '../hooks/usePagination'
import { photosContext } from '../context/PhotosContext'



import Card from '../UI/Card/Card'
import Modal from '../UI/Modal/Modal'
import Input from '../UI/Input/Input'
import './../styles/scss/Photos/Photos.scss'

export default function Photos() {
  const { photos, loading } = useContext(photosContext);
  const [currentPhotos, setCurrentPhotos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosVisible, setPhotosVisible] = useState([]);
  console.log(photos);
  

  const [isShowModalSort, setIsShowModalSort] = useState(false);
  const [sortParam, setSortParam] = useState('albumId');
  const [sortDirection, setSortDirection] = useState('asc');

  const [, , sortPosts] = useFilter();
  const [setPage, getArrayPages, countPages] = usePagination(photos, 20);
  const [arrayPages, setArrayPages] = useState([]);
  const [searchPage, setSearchPage] = useState('');

  const selectSortRef = useRef(null);
  const selectSortDirectionRef = useRef(null);

  // Определяет какие страницы будут показываться в пагинации
  useEffect(() => {
    setArrayPages(getArrayPages(currentPage))
  }, [countPages, currentPage]);

  // При изменении страницы получаем нужные данные и сбрасываем фильтры
  useEffect(() => {
    setCurrentPhotos(setPage(currentPage));
    setPhotosVisible(currentPhotos);
  }, [photos, currentPage]);

  // Изменение показывающихся данных в зависимости с параметрами поиска, сортировки и фильтрации
  useEffect(() => {
    let newArrayPosts = currentPhotos
    if (sortParam) {
      newArrayPosts = sortPosts(newArrayPosts, sortParam, sortDirection)
    }
    setPhotosVisible(newArrayPosts)
  }, [currentPhotos, sortParam, sortDirection]);


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

        <div className='filters'>
          <button onClick={() => setIsShowModalSort(true)}>Сортировка</button>
        </div>

        <div className="container" >
          {photosVisible?.map((photo) => {
            return (<Card title={photo['title']} imgUrl={photo['url']} key={photo['id']} link={`/photos/${photo['id']}`}/>)
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
              <option value="albumId" key="albumId">По albumId</option>              
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
