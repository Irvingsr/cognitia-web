import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/servicios',   label: 'Servicios' },
  { to: '/manifiesto',  label: 'Manifiesto' },
  { to: '/blog',        label: 'Blog' },
  { to: '/diagnostico', label: 'Diagnóstico IFC™', highlight: true },
  { to: '/calculadora', label: 'Calculadora ROI' },
]

const WHATSAPP_URL = 'https://wa.me/529841798638?text=Hola%20Irving%2C%20vengo%20de%20cognitiamx.com%20y%20quiero%20saber%20m%C3%A1s'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>◈</span>
          <span style={styles.logoText}>Cognitia</span>
        </Link>

        {/* Desktop links */}
        <div style={styles.links} data-links="">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              style={({ isActive }) => ({
                ...styles.link,
                ...(l.highlight ? styles.linkHighlight : {}),
                ...(isActive ? styles.linkActive : {}),
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={styles.waBtn} aria-label="WhatsApp directo">
            WhatsApp
          </a>
          <Link to="/contacto" style={styles.ctaBtn}>Contáctanos</Link>
        </div>

        {/* Mobile burger */}
        <button style={styles.burger} data-burger="" onClick={() => setOpen(o => !o)} aria-label="Menú">
          <span style={{ ...styles.bar, ...(open ? styles.bar1Open : {}) }} />
          <span style={{ ...styles.bar, ...(open ? styles.bar2Open : {}) }} />
          <span style={{ ...styles.bar, ...(open ? styles.bar3Open : {}) }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={styles.mobile}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} style={styles.mobileLink} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ ...styles.waBtn, width: '100%', justifyContent: 'center' }} onClick={() => setOpen(false)}>
            WhatsApp directo
          </a>
          <Link to="/contacto" style={{ ...styles.ctaBtn, width: '100%', justifyContent: 'center' }} onClick={() => setOpen(false)}>
            Contáctanos
          </Link>
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(5,10,18,0.85)', backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 24px',
    height: 64, display: 'flex', alignItems: 'center', gap: 32,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2,
    color: '#F2F4F7', flexShrink: 0,
  },
  logoIcon: { fontSize: 24, color: '#6E9FD4' },
  logoText: {},
  links: { display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto', flexWrap: 'nowrap' },
  link: {
    padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
    color: '#93A7BD', transition: 'color 0.2s', textDecoration: 'none', whiteSpace: 'nowrap',
  },
  linkHighlight: {
    border: '1px solid rgba(139,30,45,0.5)', color: '#D98A95',
    borderRadius: 100, padding: '5px 14px',
  },
  linkActive: { color: '#6E9FD4' },
  waBtn: {
    marginLeft: 8, padding: '7px 18px', borderRadius: 100,
    background: 'transparent', border: '1px solid rgba(110,159,212,0.4)',
    color: '#6E9FD4', fontSize: 14, fontWeight: 600,
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
    whiteSpace: 'nowrap', transition: 'border-color 0.2s, color 0.2s',
  },
  ctaBtn: {
    marginLeft: 8, padding: '8px 20px', borderRadius: 100,
    background: 'linear-gradient(135deg, #A8293C, #8B1E2D)',
    color: '#fff', fontSize: 14, fontWeight: 600, border: 'none',
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
    boxShadow: '0 4px 16px rgba(139,30,45,0.4)', whiteSpace: 'nowrap',
  },
  burger: {
    display: 'none', flexDirection: 'column', gap: 5,
    background: 'none', border: 'none', cursor: 'pointer',
    padding: 6, marginLeft: 'auto',
  },
  bar: {
    width: 22, height: 2, background: '#F2F4F7', borderRadius: 2,
    transition: 'transform 0.3s, opacity 0.3s', display: 'block',
  },
  bar1Open: { transform: 'translateY(7px) rotate(45deg)' },
  bar2Open: { opacity: 0 },
  bar3Open: { transform: 'translateY(-7px) rotate(-45deg)' },
  mobile: {
    padding: '16px 24px 24px',
    display: 'flex', flexDirection: 'column', gap: 8,
    borderTop: '1px solid rgba(255,255,255,0.07)',
  },
  mobileLink: {
    padding: '12px 16px', borderRadius: 10, fontSize: 15, fontWeight: 500,
    color: '#93A7BD', textDecoration: 'none',
  },
}

// Show burger only on mobile via a style tag injection
if (typeof document !== 'undefined') {
  const s = document.createElement('style')
  s.textContent = `
    @media (max-width: 768px) {
      nav [data-links] { display: none !important; }
      nav [data-burger] { display: flex !important; }
    }
  `
  document.head.appendChild(s)
}
