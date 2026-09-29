import { Routes, Route } from 'react-router-dom'
import TallerNav from './components/TallerNav'
import TallerFoot from './components/TallerFoot'
import ChatWidget from './components/ChatWidget'
import WhatsAppFlotante from './components/WhatsAppFlotante'
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
//
// Todo el sitio vive en la dirección visual "Taller" (ver src/pages/Home.jsx
// y src/styles/taller.css): cada página se envuelve en <div className="taller">
// y comparte este nav/footer.
export default function App() {
  return (
    <div className="taller">
      <Seo />
      <TallerNav />
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
      <TallerFoot />
      <ChatWidget />
      <WhatsAppFlotante />
    </div>
  )
}
