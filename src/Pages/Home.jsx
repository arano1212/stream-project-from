import React, { useEffect, useState } from 'react'
import axiosInstance from '@/Services/movieServices'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FaThumbsUp, FaRegBell } from 'react-icons/fa'
import '@/Styles/home.css'
import '@/Styles/like.css'

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
  const [likedMovies, setLikedMovies] = useState({})

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

  const handleLike = async (movieId) => {
    try {
      // Verificar si el usuario ya ha dado like a esta película
      if (likedMovies[movieId]) {
        alert("You've already liked this movie.")
        return
      }

      // Obtener el token de autenticación del almacenamiento local
      const token = localStorage.getItem('token')

      // Realizar la solicitud para dar like a la película
      await axiosInstance.patch(
        `/api/v1/movies/${movieId}`,
        {
          // Incrementar el vote_count en 1
          vote_count: movies.find((movie) => movie._id === movieId).vote_count + 1
        },
        {
          // Agregar el token de autenticación al encabezado
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Realizar una solicitud GET para obtener la información actualizada de la película
      const updatedMovieResponse = await axiosInstance.get(`/api/v1/movies/vote-counts/${movieId}`)
      const updatedMovie = updatedMovieResponse.data

      // Actualizar el estado de las películas con la información actualizada
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie._id === movieId ? { ...movie, vote_count: updatedMovie.vote_count } : movie))
      )

      // Actualizar el estado para reflejar que el usuario ha dado like a esta película
      setLikedMovies((prevState) => ({
        ...prevState,
        [movieId]: true
      }))

      alert("You've liked the movie successfully.")
    } catch (error) {
      console.error('Error liking movie:', error)
      alert('Failed to like the movie. Please try again later.')
    }
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
                  row.map((movie) => (
                    <div className='movie-card' key={movie._id} onClick={() => handleShowModal(movie)}>
                      <img
                        src={movie.poster_path.startsWith('data:image') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                      <p>Vote: {parseInt(movie.vote_count)}</p>
                      {likedMovies[movie._id]
                        ? (
                          <span className='liked-text'>
                            Esto te gusta
                            <FaRegBell className='icon-party-horn' />
                          </span>
                          )
                        : (
                          <button className='like-button' onClick={(e) => { e.stopPropagation(); handleLike(movie._id) }}>
                            <FaThumbsUp className='icon-thumb' /> Like
                          </button>
                          )}
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
        <Modal.Footer style={{
          backgroundColor: '#141414',
          borderTop: 'none'
        }}
        >
          <Button variant='danger' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home
