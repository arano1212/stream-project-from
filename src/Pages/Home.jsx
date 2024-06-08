import React, { useEffect, useState } from 'react'
import '@/Styles/home.css'
import axiosInstance from '../Services/movieServices'

const shuffleArray = (array) => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

const Home = () => {
  const [movies, setMovies] = useState([])
  const [shuffledMovies, setShuffledMovies] = useState([])

  useEffect(() => {
    axiosInstance.get('/api/v1/movies', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => {
        const moviesData = response.data || []
        setMovies(moviesData)
        setShuffledMovies(shuffleArray(moviesData))
      })
      .catch((error) => {
        console.error('Error fetching movies:', error)
        setMovies([]) 
      })
  }, [])

  const scrollLeft = (rowIndex) => {
    document.querySelector(`.movies-flex.row-${rowIndex}`).scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }

  const scrollRight = (rowIndex) => {
    document.querySelector(`.movies-flex.row-${rowIndex}`).scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }


  const movieRows = []
  for (let i = 0; i < shuffledMovies.length; i += 7) {
    movieRows.push(shuffledMovies.slice(i, i + 7))
  }

  return (
    <div className='home-container'>
      {movieRows.map((row, rowIndex) => (
        <div className='movie-row' key={rowIndex}>
          <button className='nav-arrow left' onClick={() => scrollLeft(rowIndex)}>
            &lt; 
          </button>
          <div className={`movies-flex row-${rowIndex}`}>
            {row.length > 0
              ? (
                  row.map(movie => (
                    <div className='movie-card' key={movie._id}>
                      <img
                        src={movie.poster_path.startsWith('data:image') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                    </div>
                  ))
                )
              : (
                <p>Loading...</p>
                )}
          </div>
          <button className='nav-arrow right' onClick={() => scrollRight(rowIndex)}>
            &gt;
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
