import { Routes, Route } from 'react-router-dom'
import './styles/scss/App/App.scss';
import './styles/scss/filters/filters.scss'


import HomePage from './pages/HomePage';
import Albums from './pages/Albums';
import Comments from './pages/Comments';
import Photos from './pages/Photos';
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import Users from './pages/Users';
import NotFound from './pages/NotFound';


import Header from './components/Header.jsx';
import { useState } from 'react';


function App() {

  const [isSowModal, setIsShowModal] = useState(false)
  const [paramsFilter, setParamsFilter] = useState([])

  return (
    <div className="App">
      <Header setParamsFilter={setParamsFilter}/>      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
