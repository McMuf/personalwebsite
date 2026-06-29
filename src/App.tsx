import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import type { AnimType } from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'

const ROUTE_ANIM: Record<string, AnimType> = {
  '/about':      0,  // Royal Flush Fan
  '/resume':     1,  // Card Rain
  '/experience': 2,  // Coin Flip
  '/projects':   3,  // Suit Convergence
  '/contact':    0,  // Royal Flush Fan
}

function AnimatedRoutes() {
  const location = useLocation()
  const [loading, setLoading]           = useState(false)
  const [animType, setAnimType]         = useState<AnimType>(0)
  const [displayLocation, setDisplayLocation] = useState(location)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setAnimType(ROUTE_ANIM[location.pathname] ?? 0)
      setLoading(true)
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [location, displayLocation])

  return (
    <>
      {loading && <LoadingScreen animType={animType} />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
