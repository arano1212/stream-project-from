import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '@/Styles/register.css'
import { registerUserServices, checkUserName } from '@/Services/useServices'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [role, setRole] = useState('basic')
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  const [usernameMessage, setUsernameMessage] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    const checkUsernameAvailability = async (username) => {
      try {
        const response = await checkUserName(username)
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
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('username', username)
      if (avatar) {
        formData.append('avatar', avatar)
      }
      formData.append('role', role)

      await registerUserServices(formData)
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
            <p style={{ color: isUsernameAvailable ? 'green' : 'red' }}>{usernameMessage}</p>
          </div>
          <div className='form-group'>
            <label>Avatar URL:</label>
            <input
              type='text'
              name='avatar'
              {...register('avatar')}
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <label htmlFor='formFile' className='form-label mt-4'>
              Upload Avatar
            </label>
            <input
              className='form-control'
              type='file'
              id='formFile'
              name='avatar'
              onChange={(e) => setAvatar(e.target.files[0])}
            />
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
