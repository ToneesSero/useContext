import { Routes, Route } from 'react-router-dom'
import './styles/scss/App/App.scss';
import './styles/scss/filters/filters.scss'

// Страницы
import HomePage from './pages/HomePage';
import Albums from './pages/Albums';
import Comments from './pages/Comments.jsx';
import Photos from './pages/Photos';
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import Users from './pages/Users';
import NotFound from './pages/NotFound';

// Элементы
import Header from './components/Header.jsx';
import Detail_Info from './pages/Detail_Info.jsx';
import PostsContextProvider from './context/PostsContext.jsx';
import AlbumContextProvider from './context/AlbumContext.jsx';
import CommentContextProvider from './context/ComentContext.jsx';
import PhotosContextProvider from './context/PhotosContext.jsx';
import UsersContextProvider from './context/UsersContext.jsx';
import TodosContextProvider from './context/TodosContext.jsx';



function App() {

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Albums */}
        <Route path="/albums" element={
          <AlbumContextProvider>
            <Albums />
          </AlbumContextProvider>
        } />
        <Route path="/albums/:id" element={
          <Detail_Info url={'https://jsonplaceholder.typicode.com/albums'} field={'id'} />
        } />

        {/* Comments */}
        <Route path="/comments" element={
          <CommentContextProvider>
            <Comments />
          </CommentContextProvider>
        } />
        <Route path="/comments/:id" element={
          <Detail_Info url={'https://jsonplaceholder.typicode.com/comments'} field={'id'} />
        } />

        {/* Photos */}
        <Route path="/photos" element={
          <PhotosContextProvider>
            <Photos />
          </PhotosContextProvider>
        } />
        <Route path="/photos/:id" element={
          <Detail_Info url={'https://jsonplaceholder.typicode.com/photos'} field={'id'} />
        } />

        {/* Posts */}
        <Route path="/posts" element={
          <PostsContextProvider>
            <Posts />
          </PostsContextProvider>
        } />
        <Route path="/posts/:id" element={
          <Detail_Info url={'https://jsonplaceholder.typicode.com/posts'} field={'id'} />
        } />

        {/* Users */}
        <Route path="/users" element={
          <UsersContextProvider>
            <Users />
          </UsersContextProvider>
        } />
        <Route path="/users/:id" element={
          <Detail_Info url={'https://jsonplaceholder.typicode.com/users'} field={'id'} />
        } />


        <Route path="/todos" element={
          <TodosContextProvider>
            <Todos />
          </TodosContextProvider>
        } />
        <Route path="/todos/:id" element={
          <Detail_Info url={'https://jsonplaceholder.typicode.com/todos'} field={'id'} />
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
