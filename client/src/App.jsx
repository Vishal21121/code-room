import Home from './components/IDE'
import LandingPage from './pages/LandingPage'
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter className="bg-[#22272e]">
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
