import './App.css';
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from './api/post'
import EditPost from './EditPost';
import { useWindowSize } from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {

  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const{width}=useWindowSize()
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  useEffect(() => {
    setPosts(data);
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {
      id, title: postTitle, datetime, body
        : postBody
    }
    try {
      const response = await api.post('/posts', newPost)
      const allpost = [...posts, response.data]
      setPosts(allpost)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  useEffect(() => {
    const filteredResult = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filteredResult.reverse())
  }, [posts, search])

  const handeleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      const postList = posts.filter(post => post.id !== id)
      setPosts(postList)
      navigate('/')
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }


  }



  const handleUpdate = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {
      id, title: editTitle, datetime, body
        : editBody
    }
    try {
      const response = await api.put(`posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }


  return (
    <div className="App">

      <Header title={'Social Media'} width={width}/>
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path='/'
          element={<Home posts={searchResult} 
            fetchError={fetchError}
            isLoading={isLoading}
          />} />
        <Route path='post'>
          <Route index element={
            <NewPost handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />} />
          <Route path=':id' element={<PostPage posts={posts} handeleDelete={handeleDelete} />} />
        </Route>
        <Route path="edit/:id" element={<EditPost 
            posts={posts}
            editBody={editBody}
            setEditBody={setEditBody}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            handleEdit={handleUpdate}
          />}/>
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />

      </Routes>
      <Footer />


    </div>
  );
}

export default App;
