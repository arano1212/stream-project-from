import '@/Styles/formLogin.css'
import axiosInstance from '@/Services/movieServices'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form' // Asegúrate de importar useForm desde 'react-hook-form'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    console.log('Form data:', data) // Para verificar que los datos del formulario están llegando correctamente
    try {
      const response = await axiosInstance.post('/api/v1/login', data)
      console.log('Response:', response) // Para verificar la respuesta del backend
      if (response.status === 200) {
        // Asumiendo que la respuesta contiene un token de autenticación u otro indicador de éxito
        navigate('/') // Redirigir a la página de inicio
      }
    } catch (error) {
      console.error('Login failed:', error) // Aquí puedes manejar los errores de login, como mostrar un mensaje al usuario
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
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
