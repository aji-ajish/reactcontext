import React, { useContext } from 'react'
import { Feed } from './Feed'
import DataContext from './context/DataContext'

function Home() {
  const{ searchResult, isLoading, fetchError }=useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{ color: 'red' }}>
        {fetchError} </p>}
      {!isLoading && !fetchError && (searchResult.length ? <Feed posts={searchResult} /> : <p className='statusMsg'>
        No posts to Display
      </p>)}
    </main>
  )
}

export default Home