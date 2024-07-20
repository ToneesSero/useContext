import React, { useState, useEffect, Fragment, useContext } from 'react'
import { useFilter } from '../hooks/useFilter'
import { usersContext } from '../context/UsersContext'


import Card from '../UI/Card/Card'
import Input from '../UI/Input/Input'
import './../styles/scss/Users/Users.scss'

export default function Users() {

  const { users, loading } = useContext(usersContext);
  const [currentUsers, setCurrentUsers] = useState(null);
  const [usersVisible, setUsersVisible] = useState([]);

  const [query, setQuery] = useState('');
  const [queryField, setQueryField] = useState('email')
  const [paramsForSearch, setParamsForSearch] = useState([{value:'address!!geo!!lat',name:'Широта'},{value:'address!!geo!!lng',name:'Долгота'},{value:'address!!city',name:'Город'},{value:'address!!street',name:'Улица'},{value:'email',name:'Эл. почта'}])
  const [, queryPosts] = useFilter();

  useEffect(() => {
    setCurrentUsers(users)
  }, [users])

  // Изменение показывающихся данных в зависимости с параметрами поиска, сортировки и фильтрации
  useEffect(() => {
    let newArrayPosts = currentUsers
    if (query) {
      console.log(queryField);
      let startStr = false
      if (queryField === 'address!!geo!!lng' || queryField === 'address!!geo!!lat') {
        startStr = true
      }
      newArrayPosts = queryPosts(newArrayPosts, query, queryField, startStr)
    }
    setUsersVisible(newArrayPosts)
  }, [currentUsers, query, queryField]);


  if (!loading) {
    return (
      <Fragment>

        <div className='search'>
          <Input type={"text"} placeholder={'Поиск постов по titlle'} value={query} onChange={(e) => { setQuery(e.target.value) }} />
          <select name="paramsForSearch" id="paramsForSearch" value={queryField} onChange={(e)=>setQueryField(e.target.value)}>
          {paramsForSearch?.map((param)=>{
            return(<option value={param['value'] || null} key={param['value'] || null}>{param['name'] || 'Названия нет'}</option>)
          })}
          </select>
        </div>

        <div className="container" >
          {usersVisible?.map((user) => {
            return (<Card text={user['name']} key={user['id']} email={user['email']} link={`/users/${user['id']}`}/>)
          })}
        </div>

      </Fragment>


    )
  }
  else {
    return (<Fragment>Загрузка...</Fragment>)
  }
}
