import { Routes, Route } from 'react-router-dom'
import './styles/scss/App/App.scss';
import './styles/scss/filters/filters.scss'
import { useState } from 'react';

// Страницы
import HomePage from './pages/HomePage';
import Albums from './pages/Albums';
import Comments from './pages/comment/Comments.jsx';
import Photos from './pages/Photos';
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import CommentContextProvider from './context/ComentContext.jsx';

// Элементы
import Header from './components/Header.jsx';
import Detail_Info from './pages/comment/Detail_Info.jsx';



function App() {  

  return (
    <div className="App">
      <Header  />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<Albums />} />

        <Route path="/comments" element={
          <CommentContextProvider>
            <Comments />
          </CommentContextProvider>
        } />
        <Route path="/comments/:id" element={          
            <Detail_Info url={'https://jsonplaceholder.typicode.com/comments'} field={'id'}/>          
        } />


        <Route path="/photos" element={<Photos />} />

        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:userId" element={          
            <Detail_Info url={'https://jsonplaceholder.typicode.com/posts'} field={'userId'}/>          
        } />
        <Route path="/users" element={<Users />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
