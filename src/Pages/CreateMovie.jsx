import React, { useState } from 'react'
import '@/Styles/createMovie.css'
import axios from 'axios'

const CreateMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    release_date: '',
    popularity: '',
    vote_average: '',
    vote_count: '',
    poster_path: '',
    original_language: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/movies', formData)
      console.log('Movie created successfully:', response.data)
    } catch (error) {
      console.error('Error creating movie:', error)
    }
  }

  return (
    <div className='create-movie-container'>
      <h2>Create Movie</h2>
      <form className='create-movie-form' onSubmit={handleSubmit}>
        <label>
          Title:
          <input type='text' name='title' value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Overview:
          <textarea name='overview' value={formData.overview} onChange={handleChange} required />
        </label>
        <label>
          Release Date:
          <input type='date' name='release_date' value={formData.release_date} onChange={handleChange} required />
        </label>
        <label>
          Popularity:
          <input type='number' name='popularity' value={formData.popularity} onChange={handleChange} required />
        </label>
        <label>
          Vote Average:
          <input type='number' step='0.1' name='vote_average' value={formData.vote_average} onChange={handleChange} required />
        </label>
        <label>
          Vote Count:
          <input type='number' name='vote_count' value={formData.vote_count} onChange={handleChange} required />
        </label>
        <label>
          Poster Path:
          <input type='text' name='poster_path' value={formData.poster_path} onChange={handleChange} required />
        </label>
        <label>
          Original Language:
          <input type='text' name='original_language' value={formData.original_language} onChange={handleChange} required />
        </label>
        <button type='submit'>Create Movie</button>
      </form>
    </div>
  )
}

export default CreateMovie
