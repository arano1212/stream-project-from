import React, { useState, useEffect } from 'react'
import axiosInstance from '@/Services/movieServices'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '@/Styles/register.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [role, setRole] = useState('basic')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  const [usernameMessage, setUsernameMessage] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    const checkUsernameAvailability = async (username) => {
      try {
        const response = await axiosInstance.get(`/api/v1/check-username/${username}`)
        setIsUsernameAvailable(response.data.isAvailable)
        setUsernameMessage(response.data.isAvailable ? 'Username is available' : 'Username is not available')
      } catch (error) {
        console.error('Error checking username availability:', error)
        setUsernameMessage('Error checking username availability')
      }
    }

    if (username.trim() !== '') {
      checkUsernameAvailability(username)
    }
  }, [username])

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/api/v1/register', {
        email,
        password,
        username,
        avatar,
        role
      })
      // Redirigir a la página de inicio de sesión después del registro exitoso
      navigate('/login')
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  return (
    <>
      <div className='register-container'>
        <div className='shared-background' />
        <div className='shared-overlay' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              {...register('email', { required: true })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              {...register('password', { required: true })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Username:</label>
            <input
              type='text'
              name='username'
              {...register('username', { required: true })}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p style={{ color: isUsernameAvailable ? 'black' : 'red' }}>{usernameMessage}</p>
          </div>
          <div className='form-group'>
            <label>Avatar URL:</label>
            <input
              type='text'
              name='avatar'
              {...register('avatar')}
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <label htmlFor='formFile' className='form-label mt-4'>
              Upload Avatar
            </label>
            <input className='form-control' type='file' id='formFile' name='avatar' />
          </div>
          <div className='form-group'>
            <label>Role:</label>
            <select
              name='role'
              {...register('role', { required: true })}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value='basic'>Basic</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    </>
  )
}

export default Register
