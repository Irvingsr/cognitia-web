import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Manifiesto from './pages/Manifiesto'
import Diagnostico from './pages/Diagnostico'
import Calculadora from './pages/Calculadora'
import Contacto from './pages/Contacto'

export default function App() {
  return (
    <BrowserRouter>
      {/* Blobs animados fijos — siempre visibles sin importar el scroll */}
      <div className="background-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <Nav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/manifiesto" element={<Manifiesto />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
