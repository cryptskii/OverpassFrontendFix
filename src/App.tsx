import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'

const App: React.FC = () => {
  return (
    <div className="pip-boy-container">
      <div className="pip-boy-screen scanlines">
        <Header />
        <main className="pip-boy-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
