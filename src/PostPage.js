import React from 'react'
import { Link, useParams } from 'react-router-dom'


function PostPage({ posts, handeleDelete }) {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body} {post.id}</p>
          <Link to={`/edit/${id}`}><button style={{ background: 'green' }}>Edit Post</button></Link>
          <button onClick={() => handeleDelete(post.id)}>Delete</button>
        </>}{!post &&
          <>
            <h2>Page not found</h2>
            <p>well, that's disappointing</p>
            <Link to='/'> <p>visit our home page</p></Link>
          </>}
      </article>

    </main>
  )
}

export default PostPage