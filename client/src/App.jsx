import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import Signin from './components/Signin'
import RoomJoin from './components/RoomJoin'

function App() {

  return (
    <>
      <BrowserRouter className="bg-[#22272e]">
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Routes>
          <Route path='/:roomId' element={<LandingPage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/room' element={<RoomJoin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
