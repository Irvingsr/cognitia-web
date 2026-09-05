import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Seo from './components/Seo'
import Home from './pages/Home'
import Servicios from './pages/Servicios'
import Manifiesto from './pages/Manifiesto'
import Diagnostico from './pages/Diagnostico'
import Scorecard from './pages/Scorecard'
import Calculadora from './pages/Calculadora'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

// El Router NO vive aquí: lo aporta quien monta la app.
// En el navegador es BrowserRouter (src/main.jsx); en el prerender es
// StaticRouter (src/entry-server.jsx), que no depende de `document`.
export default function App() {
  const { pathname } = useLocation()
  // El Home de la direccion "Taller" trae su propia cabecera y pie en claro.
  // El resto del sitio conserva la navegacion oscura hasta que se extienda el rediseno.
  const homeClaro = pathname === '/'

  return (
    <>
      <Seo />
      {!homeClaro && (
        <div className="background-blobs" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
      )}
      {!homeClaro && <Nav />}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/manifiesto" element={<Manifiesto />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!homeClaro && <Footer />}
      <ChatWidget />
    </>
  )
}
