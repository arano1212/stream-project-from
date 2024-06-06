import Header from '@/Components/Header'
import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from '@/Routes'

function App () {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RoutesIndex />
      </BrowserRouter>

    </>
  )
}

export default App
