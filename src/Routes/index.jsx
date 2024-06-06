import { Routes, Route } from 'react-router-dom'
import { Login, Home, Welcome } from '@/Pages'

const Index = () => {
  return (
    <>
      <Routes>
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default Index
