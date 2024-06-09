import { Routes, Route } from 'react-router-dom'
import { Login, Home, Welcome, Register, CreateMovie } from '@/Pages'

const Index = () => {
  return (
    <>
      <Routes>
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/createMovie' element={<CreateMovie />} />
      </Routes>
    </>
  )
}

export default Index
