import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

function EditPost() {
  const{posts,editBody,setEditBody,editTitle,setEditTitle,handleUpdate}=useContext(DataContext)
  
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id)
    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditBody,setEditTitle])
    return (
    <main className='NewPost'>
    {editTitle &&
    <>
      <h2>Edit Post</h2>
      <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="postTitle">Title : </label>
          <input type="text" 
           id="postTitle"
          required
          value={editTitle}
          onChange={(e)=>setEditTitle(e.target.value)}
           />
        <label htmlFor="postBody">Post : </label>
        <textarea  id="postBody" 
        required
        value={editBody} 
          onChange={(e)=>setEditBody(e.target.value)}
        />
        <button type='submit' onClick={()=>handleUpdate(post.id)}>Submit</button>
        
      </form>
      </> }{!editTitle &&
          <>
            <h2>Page not found</h2>
            <p>well, that's disappointing</p>
            <Link to='/'> <p>visit our home page</p></Link>
          </>}
    </main>
  )
}

export default EditPost