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
          toastOptions={
            {
              className: "bg-gray-900 text-white"
            }
          }
          position='top-right'
        />
        <Routes>
          <Route path='/room/:roomId' element={<LandingPage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/' element={<Login />} />
          <Route path='/createroom' element={<RoomJoin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
