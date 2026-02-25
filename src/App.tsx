import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CustomCursor } from './components/CustomCursor'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { ProjectTemplate } from './pages/ProjectTemplate'
import './App.css'

/* ==========================================
   APP
   ========================================== */
export default function App() {
  return (
    <Router>
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waterfall" element={<ProjectTemplate />} />
      </Routes>
      <Footer />
    </Router>
  )
}
