import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/Hooks/useAuth'

const Header = () => {
  const { isAuth, logout, userPayload } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='navbar navbar-expand-lg bg-dark' data-bs-theme='dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/welcome'>
          <img
            className='mb-4'
            src='./src/assets/s.png'
            width={45}
            height={40}
            alt='logo-stream'
            style={{ marginLeft: '10px', marginRight: '25px' }}
          />
          Stream
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarColor02'>
          <ul className='navbar-nav me-auto'>
            {isAuth
              ? (
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link active' to='/'>
                      Home
                      <span className='visually-hidden'>(current)</span>
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>About</a>
                  </li>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      data-bs-toggle='dropdown'
                      href='#'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      Dropdown
                    </a>
                    <div className='dropdown-menu'>
                      {userPayload?.role === 'admin' && (
                        <NavLink className='dropdown-item' to='/createmovie'>
                          Post
                        </NavLink>
                      )}
                      <a className='dropdown-item' href='#'>Another action</a>
                      <a className='dropdown-item' href='#'>Something else here</a>
                      <div className='dropdown-divider' />
                      <button className='dropdown-item btn' onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </li>
                </>
                )
              : (
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/welcome'>Welcome</NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/login'>Login</NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/register'>Register</NavLink>
                  </li>
                </>
                )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
