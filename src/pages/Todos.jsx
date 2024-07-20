import React, { useState, useEffect, Fragment, useRef, useContext } from 'react'
import { useFilter } from '../hooks/useFilter'
import { usePagination } from '../hooks/usePagination'
import { todosContext } from '../context/TodosContext'

import Select from 'react-select'
import Card from '../UI/Card/Card'
import Modal from '../UI/Modal/Modal'
import Input from '../UI/Input/Input'
import './../styles/scss/Todos/Todos.scss'

export default function Todos() {
  const { todos, loading } = useContext(todosContext);
  const [currentTodos, setCurrentTodos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosVisible, setTodosVisible] = useState([])

  const [isShowModalFilter, setIsShowModalFilter] = useState(false);
  const [isShowModalSort, setIsShowModalSort] = useState(false);
  const [sortParam, setSortParam] = useState('userId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [filterOptions, setFilterOptions] = useState([])

  const [filterTodos, queryTodos, sortTodos] = useFilter();
  const [setPage, getArrayPages, countPages] = usePagination(todos, 20)
  const [arrayPages, setArrayPages] = useState([])
  const [searchPage, setSearchPage] = useState('')

  // Значения для фильтра
  useEffect(() => {
    if (Array.isArray(currentTodos) && currentTodos.length > 0) {
      let allOptions = [];
      currentTodos.forEach(element => {
        if (Object.keys(element).includes('userId')) {
          let valueEl = element['userId']
          let strObj = JSON.stringify({ value: valueEl, label: `userId = ${valueEl}`, key: 'userId' });
          if (!allOptions.includes(strObj)) {
            allOptions.push(strObj);
          }
        }
        if (Object.keys(element).includes('completed')) {
          let valueEl = element['completed']
          let strObj = JSON.stringify({ value: valueEl, label: `completed = ${valueEl}`, key: 'completed' });
          if (!allOptions.includes(strObj)) {
            allOptions.push(strObj);
          }
        }
      });
      allOptions = allOptions.map((el) => JSON.parse(el));
      setFilterOptions(allOptions);     
    }
  }, [currentTodos])

  // Определяет какие страницы будут показываться в пагинации
  useEffect(() => {
    setArrayPages(getArrayPages(currentPage))
  }, [countPages, currentPage]);

  // При изменении страницы получаем нужные данные 
  useEffect(() => {
    setCurrentTodos(setPage(currentPage));
    setTodosVisible(currentTodos);
  }, [todos, currentPage]);

  // Изменение показывающихся данных в зависимости с параметрами поиска, сортировки и фильтрации
  useEffect(() => {
    let newArrayTodos = currentTodos
    if (query) {
      newArrayTodos = queryTodos(newArrayTodos, query, 'title')
    }
    if (sortParam) {
      newArrayTodos = sortTodos(newArrayTodos, sortParam, sortDirection)
    }
    if (selectedFilter) {
      selectedFilter.forEach(element => {
        newArrayTodos = filterTodos(newArrayTodos, element['value'], element['key'])
      });
    }
    setTodosVisible(newArrayTodos)
  }, [currentTodos, query, selectedFilter, sortParam, sortDirection]);

  // Ввод страницы через input
  function changeSearchPage(value) {
    if (!isNaN(value) && value > 0 && value < countPages) {
      setCurrentPage(Number(value))
    }
    setSearchPage((value))
  };

  function changeSelectedFilter(value) {
    setSelectedFilter(value)
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
          <Input type={"text"} placeholder={'Поиск постов по titlle'} value={query} onChange={(e) => { setQuery(e.target.value) }} />

        </div>

        <div className='filters'>
          <button onClick={() => setIsShowModalFilter(true)}>Фильтры</button>
        </div>

        <div className='filters'>
          <button onClick={() => setIsShowModalSort(true)}>Сортировка</button>
        </div>

        <div className="container" >
          {todosVisible?.map((todo) => {
            return (<Card title={todo['title']} key={todo['id']} checkbox={true} checkboxValue={todo['completed'] || false} link={`/todos/${todo['id']}`}/>)
          })}
        </div>

        <Modal visible={isShowModalSort} setVisible={setIsShowModalSort}>
          <div className='modal__title'>
            <h3>Сортировка постов</h3>
          </div>
          <hr />
          <div className='modal__container'>
            <p>Сортировка</p>
            <select onChange={(e) => setSortParam(e.target.value)} defaultValue={'userId'}>
              <option disabled value='null' key='null'>Сортировка: </option>
              <option value="userId" key="userId">По userId</option>
            </select>

            <p>Настройки сортировки</p>
            <select onChange={(e) => setSortDirection(e.target.value)} defaultValue={'asc'}>
              <option value="asc" key="asc" >По возрастанию</option>
              <option value="desc" key="desc">По убыванию</option>
            </select>
          </div>
        </Modal>

        <Modal visible={isShowModalFilter} setVisible={setIsShowModalFilter}>
          <div className='modal__title'>
            <h3>Фильтрация todos</h3>
          </div>
          <hr />
          <div className='modal__container'>
            <Select options={filterOptions} value={selectedFilter} onChange={changeSelectedFilter} isMulti />
          </div>
        </Modal>

      </Fragment>


    )
  }
  else {
    return (<Fragment>Загрузка...</Fragment>)
  }
}
