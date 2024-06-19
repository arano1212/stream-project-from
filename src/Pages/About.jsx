import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { getAllMovieServices } from '@/Services/movieServices2'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const About = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovieServices()
        setMovies(response.data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }

    fetchMovies()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800
  }

  return (
    <div>
      <h1>About</h1>
      <h2>Proyecto realizado con el web service de 'https://stream-project-1.onrender.com/api/v1' - Programador: Angel Arano</h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie._id}>
              <img
                src={
                  movie.poster_path.startsWith('data:image')
                    ? movie.poster_path
                    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
                alt={movie.title}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  )
}

export default About
