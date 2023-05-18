import React from 'react'
import { Link } from 'react-router-dom'

function Missing() {
  return (
    <main className='Missing'>
      <h2>Page not found</h2>
      <p>well, that's disappointing</p>
     <Link to='/'> <p>visit our home page</p></Link>
    </main>
  )
}

export default Missing