import './App.css'
import MonacoEditor from './components/MonacoEditor'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter className="bg-[#22272e]">
        <Routes>
          <Route path='/' element={<MonacoEditor/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
