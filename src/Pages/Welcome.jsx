import { Link } from 'react-router-dom'
import '@/Styles/wecome.css'

const Welcome = () => {
  return (
    <div className='welcome-container'>
      <div className='welcome-background'>
        <div className='welcome-overlay' />
      </div>
      <div className='welcome-content'>
        <h1>Bienvenido a Nuestro Servicio</h1>
        <p>Disfruta de miles de películas y series en cualquier lugar.</p>
        <div className='welcome-buttons'>
          <Link to='/login' className='welcome-button'>Iniciar Sesión</Link>
          <Link to='/signup' className='welcome-button'>Registrarse</Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
