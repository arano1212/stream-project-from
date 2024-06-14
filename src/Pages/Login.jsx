import '@/Styles/formLogin.css'
// import axiosInstance from '@/Services/movieServices'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '@/Hooks/useAuth'
import { loginUserServices } from '@/Services/useServices'

const Login = () => {
  const { login } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (data) => {
    console.log('Form data:', data)
    try {
      const response = await loginUserServices(data)
      console.log('Response:', response)
      if (response.status === 200) {
        const token = response.data.token
        login(token)
        navigate('/')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setErrorMessage('Invalid email or password')
      alert('Invalid email or password')
    }
  }

  return (
    <>
      <div className='login-container'>
        <div className='shared-background' />
        <div className='shared-overlay' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
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
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
