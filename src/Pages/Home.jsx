import React, { useEffect, useState } from 'react'
import axiosInstance from '@/Services/movieServices'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '@/Styles/home.css'

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
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showModal, setShowModal] = useState(false)

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
        setFeaturedMovie(moviesData[Math.floor(Math.random() * moviesData.length)])
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

  const handleShowModal = (movie) => {
    setSelectedMovie(movie)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
    setShowModal(false)
  }

  const movieRows = []
  for (let i = 0; i < shuffledMovies.length; i += 7) {
    movieRows.push(shuffledMovies.slice(i, i + 7))
  }

  return (
    <div className='home-container'>
      {featuredMovie && (
        <div className='featured-movie'>
          <img
            src={featuredMovie.poster_path.startsWith('data:image') ? featuredMovie.poster_path : `https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`}
            alt={featuredMovie.title}
          />
          <div className='featured-movie-info'>
            <h2>{featuredMovie.title}</h2>
            <p>{featuredMovie.overview}</p>
          </div>
        </div>
      )}
      {movieRows.map((row, rowIndex) => (
        <div className='movie-row' key={rowIndex}>
          <button className='nav-arrow left' onClick={() => scrollLeft(rowIndex)}>
            &lt;
          </button>
          <div className={`movies-flex row-${rowIndex}`}>
            {row.length > 0
              ? (
                  row.map(movie => (
                    <div className='movie-card' key={movie._id} onClick={() => handleShowModal(movie)}>
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#141414', borderBottom: 'none' }}>
          <Modal.Title style={{ color: '#e50914' }}>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#141414', color: '#fff' }}>
          <img
            src={selectedMovie?.poster_path.startsWith('data:image') ? selectedMovie?.poster_path : `https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`}
            alt={selectedMovie?.title}
            style={{ width: '100%', marginBottom: '20px' }}
          />
          <p>{selectedMovie?.overview}</p>
          <p><strong>Release Date:</strong> {selectedMovie?.release_date}</p>
          <p><strong>Popularity:</strong> {selectedMovie?.popularity}</p>
          <p><strong>Vote Average:</strong> {selectedMovie?.vote_average}</p>
          <p><strong>Vote Count:</strong> {selectedMovie?.vote_count}</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#141414', borderTop: 'none' }}>
          <Button variant='danger' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home
