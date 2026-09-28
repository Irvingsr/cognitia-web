import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { whatsappCon } from '../data/contacto'

/**
 * Botón flotante de WhatsApp con mensaje según el contexto.
 *
 * El mensaje que se precarga cambia con la ruta y, dentro del inicio, con la
 * sección que el visitante está viendo. La idea es que no llegue un "Hola" suelto
 * sino un mensaje que ya dice de qué venía leyendo.
 *
 * Sin dependencias nuevas: usa el router que ya existe y un IntersectionObserver
 * del navegador. Se apoya en `whatsappCon()` para no duplicar el número.
 */

/** Mensaje por ruta. La clave es el inicio de la ruta. */
const POR_RUTA = [
  ['/diagnostico', 'Hola Irving, estaba viendo el Diagnóstico Estratégico y quiero saber cómo funciona para mi negocio.'],
  ['/scorecard',   'Hola Irving, hice la evaluación de procesos en tu sitio y me gustaría platicar los resultados.'],
  ['/servicios',   'Hola Irving, vi tus servicios y quiero saber cuál le queda mejor a mi negocio.'],
  ['/calculadora', 'Hola Irving, usé la calculadora de tu sitio y quiero entender qué se puede automatizar en mi caso.'],
  ['/contacto',    'Hola Irving, quiero platicar sobre mi negocio y ver si puedes ayudarme.'],
  ['/manifiesto',  'Hola Irving, leí cómo trabajas y me gustaría platicar sobre mi negocio.'],
  ['/blog',        'Hola Irving, estaba leyendo un artículo de tu blog y me surgió una duda sobre mi negocio.'],
]

/** Mensaje por sección dentro del inicio. */
const POR_SECCION = {
  inicio:    'Hola Irving, vengo de tu sitio y quiero platicar sobre mi negocio.',
  servicios: 'Hola Irving, estaba viendo en qué acompañas y quiero saber cuál aplica a mi caso.',
  metodo:    'Hola Irving, leí sobre el Índice de Fricción Cognitiva y quiero saber cómo se aplicaría a mi negocio.',
  conmigo:   'Hola Irving, quiero platicar directamente contigo sobre mi negocio.',
  contacto:  'Hola Irving, quiero contarte qué me gustaría mejorar en mi negocio.',
}

const GENERICO = 'Hola Irving, vengo de cognitiamx.com y quiero platicar sobre mi negocio.'

function mensajeDeRuta(pathname) {
  const encontrado = POR_RUTA.find(([ruta]) => pathname.startsWith(ruta))
  return encontrado ? encontrado[1] : GENERICO
}

export default function WhatsAppFlotante() {
  const { pathname } = useLocation()
  const esInicio = pathname === '/'
  const [seccion, setSeccion] = useState('inicio')

  // En el inicio seguimos la sección visible; en el resto basta la ruta.
  useEffect(() => {
    if (!esInicio) return
    const ids = Object.keys(POR_SECCION)
    const nodos = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!nodos.length) return

    const observer = new IntersectionObserver(
      entradas => {
        // Se queda con la sección más visible en ese momento.
        const visible = entradas
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setSeccion(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    nodos.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [esInicio, pathname])

  // Al cambiar de ruta, volvemos al mensaje de entrada del inicio.
  useEffect(() => { setSeccion('inicio') }, [pathname])

  const mensaje = esInicio
    ? (POR_SECCION[seccion] || GENERICO)
    : mensajeDeRuta(pathname)

  return (
    <a
      href={whatsappCon(mensaje)}
      target="_blank"
      rel="noreferrer"
      className="wa-flotante"
      aria-label="Escribir por WhatsApp"
      title="Escríbeme por WhatsApp"
    >
      <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z"/>
      </svg>

      <style>{`
        .wa-flotante{
          position:fixed; right:28px; bottom:96px; z-index:90;
          width:56px; height:56px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:#25D366; color:#fff;
          box-shadow:0 4px 16px rgba(37,211,102,.38), 0 2px 6px rgba(0,0,0,.18);
          transition:transform .18s ease, box-shadow .18s ease;
        }
        .wa-flotante:hover{
          transform:translateY(-2px);
          box-shadow:0 8px 24px rgba(37,211,102,.48), 0 2px 6px rgba(0,0,0,.2);
        }
        .wa-flotante:focus-visible{ outline:3px solid #128C7E; outline-offset:3px; }
        @media (max-width:700px){
          .wa-flotante{ right:20px; bottom:84px; width:50px; height:50px; }
          .wa-flotante svg{ width:24px; height:24px; }
        }
        @media (prefers-reduced-motion:reduce){
          .wa-flotante{ transition:none; }
          .wa-flotante:hover{ transform:none; }
        }
      `}</style>
    </a>
  )
}
