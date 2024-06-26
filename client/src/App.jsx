import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import Signin from './components/Signin'
import RoomJoin from './components/RoomJoin'
import { SpeedInsights } from '@vercel/speed-insights/react';
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <>
      <BrowserRouter className="bg-[#22272e]">
        <Toaster
          toastOptions={
            {
              // className: "bg-gray-900 text-white",
              style: {
                backgroundColor: "rgb(3 7 18)",
                color: "#fff",
              }
            }
          }
          position='top-right'
          reverseOrder={false}
        />
        <Routes>
          <Route path='/room/:roomId' element={<PrivateRoute>{<LandingPage/>}</PrivateRoute>}/> 
          <Route path='/signin' element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/createroom' element={<PrivateRoute>{<RoomJoin/>}</PrivateRoute>} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
    </>
  )
}

export default App
