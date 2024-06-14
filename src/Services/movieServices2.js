import axios from 'axios'

const BASE_URL = 'https://stream-project-1.onrender.com/api/v1'

const getAllMovieServices = () => axios.get(`${BASE_URL}/movies`)
const getLike = (movieId, data, config) => axios.patch(`${BASE_URL}/movies/${movieId}`, data, config)
const deleteMovie = (movieId, config) => axios.delete(`${BASE_URL}/movies/${movieId}`, config)
const createMovie = (data, token) => axios.post(
    `${BASE_URL}/movies`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    }
)

export {
  getAllMovieServices,
  getLike,
  deleteMovie,
  createMovie
}
