import { Link } from 'react-router-dom'
import Logo from './Logo'
import { WHATSAPP_URL, TELEFONO_DISPLAY, TELEFONO_E164, EMAIL, UBICACION, REDES } from '../data/contacto'

export default function TallerFoot() {
  return (
    <footer className="t-foot">
      <div className="t-wrap t-foot-in">
        <div className="t-foot-brand">
          <Logo size={26} id="taller-foot" tone="oscuro" />
          <p>Consultoría en automatización de procesos para negocios.</p>
        </div>

        <div className="t-foot-col">
          <p className="t-foot-t">Navegación</p>
          <Link to="/servicios">Servicios</Link>
          <Link to="/manifiesto">Manifiesto</Link>
          <Link to="/diagnostico">Diagnóstico Estratégico</Link>
          <Link to="/scorecard">Evaluación gratuita</Link>
          <Link to="/calculadora">Calculadora ROI</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="t-foot-col">
          <p className="t-foot-t">Contacto</p>
          <a href={`tel:${TELEFONO_E164}`}>{TELEFONO_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>{UBICACION}</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>

        <div className="t-foot-col">
          <p className="t-foot-t">Síguenos</p>
          {REDES.map(r => (
            <a key={r.nombre} href={r.url} target="_blank" rel="noopener noreferrer">{r.nombre}</a>
          ))}
        </div>
      </div>
      <div className="t-wrap t-foot-legal">
        <span>© {new Date().getFullYear()} Cognitia — EstrategIA Consulting</span>
        <Link to="/privacidad">Aviso de Privacidad</Link>
      </div>
    </footer>
  )
}
