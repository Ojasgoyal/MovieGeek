import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navfolder/Navbar.jsx'
import List from './pages/List'
import NotFound from './pages/NotFound'

function App() {

  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:type/:list" element={<List />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
