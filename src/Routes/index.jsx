import { Routes, Route, Navigate } from 'react-router-dom'
import { Login, Home, Welcome, Register, CreateMovie, Secret } from '@/Pages'
import { useAuthContext } from '@/Hooks/useAuth'

const Index = () => {
  const { isAuth } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={isAuth ? <Home /> : <Navigate to='/login' />} />
        <Route path='/createMovie' element={isAuth ? <CreateMovie /> : <Navigate to='/login' />} />
        <Route path='/secret' element={isAuth ? <Secret /> : <Navigate to='/secret' />} />
      </Routes>
    </>
  )
}

export default Index
