import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import RouteLayout from './pages/RouteLayout'
import SearchPage from "./pages/SearchPage";
import Navbar from './components/Navfolder/Navbar'

function App() {

  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/:type" element={<SearchPage />} />
      <Route path="/:type/:param2" element={<RouteLayout/>} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
