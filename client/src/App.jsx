import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  
  return (
    <>
    <div className=''>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
    </>
  )
}

export default App
