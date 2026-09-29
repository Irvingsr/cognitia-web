import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../data/contacto'

/**
 * Home — dirección visual "Taller".
 *
 * Marfil cálido de base, verde profundo como único acento, fotografía real de
 * talleres y tipografía humanista de ancho normal. Los estilos viven en
 * `src/styles/taller.css`, acotados a `.taller`. Todo el sitio usa esta
 * dirección visual (TallerNav/TallerFoot en App.jsx).
 *
 * El método IFC se describe según la definición oficial interna
 * (`00_Archivo/02_IFC_Definicion_Oficial.md`): tres áreas de fricción —
 * atención, seguimiento y conversión — no los cuatro pasos de la maqueta.
 */

const SERVICIOS = [
  {
    problema: '«Sé que algo no está funcionando, pero no sé por dónde empezar.»',
    titulo: 'Consultoría y diagnóstico',
    desc: 'Analizo cómo opera tu negocio hoy, identifico qué está frenando los resultados y te entrego prioridades y un plan de acción antes de que inviertas en nada.',
    entrega: 'Dashboard Estratégico y plan a 30, 60 y 90 días',
  },
  {
    problema: '«Ya sé qué me falla, pero no tengo cómo resolverlo.»',
    titulo: 'Implementación y automatización',
    desc: 'Construimos lo que el diagnóstico justifique: automatización de tareas repetitivas, seguimiento de prospectos, orden en la información. Nada que no salga del análisis.',
    entrega: 'Sistemas funcionando en tu operación real',
  },
  {
    problema: '«Mi equipo no usa estas herramientas y yo tampoco sé enseñarles.»',
    titulo: 'Capacitación del equipo',
    desc: 'Talleres para que tú y tu equipo aprendan a usar Claude, ChatGPT y Gemini en las tareas concretas de su trabajo, con criterio para saber cuándo conviene usarlas y cuándo no.',
    entrega: 'Equipo usando las herramientas en el día a día',
  },
]

const AREAS_IFC = [
  {
    nombre: 'Atención',
    pregunta: '¿El cliente recibe una respuesta rápida, útil y clara?',
    detalle: 'Cuánto espera, cuántas veces tiene que insistir, si obtiene una respuesta completa la primera vez.',
  },
  {
    nombre: 'Seguimiento',
    pregunta: '¿El negocio mantiene continuidad después del primer contacto?',
    detalle: 'Si alguien retoma la conversación, si se recuerda el contexto del cliente o si tiene que repetir todo otra vez.',
  },
  {
    nombre: 'Conversión',
    pregunta: '¿El proceso guía al cliente hacia una decisión?',
    detalle: 'Si sabe cuál es el siguiente paso o se queda esperando sin entender qué sigue.',
  },
]

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="t-hero" id="inicio">
        <div className="t-wrap t-hero-in">
          <div className="t-hero-txt">
            <p className="t-eyebrow">Consultoría en automatización de procesos · Playa del Carmen</p>
            <h1>Te ayudo a saber qué mejorar antes de invertir en tecnología</h1>
            <p className="t-lead">
              Muchos negocios compran herramientas antes de entender qué los está frenando.
              Trabajo al revés: primero entendemos cómo opera tu empresa y qué le cuesta
              tiempo o clientes; después decidimos si hace falta tecnología, y cuál.
            </p>
            <div className="t-actions">
              <Link to="/contacto" className="t-btn">Cuéntame sobre tu negocio</Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="t-btn-ghost">
                Escríbeme por WhatsApp
              </a>
            </div>
            <p className="t-micro">
              Empezamos con una conversación para entender tu caso. Si el diagnóstico no es
              lo que necesitas, te lo digo.
            </p>
          </div>

          <figure className="t-hero-fig">
            <img
              src="/taller-hero-1600.jpg"
              srcSet="/taller-hero-700.jpg 700w, /taller-hero-1000.jpg 1000w, /taller-hero-1600.jpg 1600w"
              sizes="(max-width: 900px) 100vw, 52vw"
              alt="Irving de los Santos impartiendo un taller sobre herramientas digitales aplicadas a negocios, con un análisis de mercado proyectado en pantalla."
              width="1600" height="900" loading="eager" decoding="async"
            />
            <figcaption>Taller para dueños de negocio · Playa del Carmen</figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------- Servicios ---------------- */}
      <section className="t-sec" id="servicios">
        <div className="t-wrap">
          <div className="t-head">
            <p className="t-eyebrow">En qué te acompaño</p>
            <h2>Tres formas de trabajar, según dónde estés hoy</h2>
            <p className="t-sub">
              No todos los negocios necesitan lo mismo. Estas son las tres situaciones con las
              que llega la mayoría.
            </p>
          </div>

          <div className="t-grid3">
            {SERVICIOS.map(sv => (
              <article key={sv.titulo} className="t-card">
                <p className="t-quote">{sv.problema}</p>
                <h3>{sv.titulo}</h3>
                <p className="t-cardtxt">{sv.desc}</p>
                <p className="t-entrega"><span>Terminas con</span>{sv.entrega}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Método IFC ---------------- */}
      <section className="t-metodo" id="metodo">
        <div className="t-wrap">
          <div className="t-head">
            <p className="t-eyebrow t-eyebrow-verde">El método</p>
            <h2>Índice de Fricción Cognitiva</h2>
            <p className="t-sub">
              Es la metodología que desarrollé para encontrar dónde un negocio pierde clientes
              por fricción. No mide qué tan avanzado eres en tecnología: mide cuánto esfuerzo
              de más tiene que hacer tu cliente para poder avanzar contigo.
            </p>
          </div>

          <blockquote className="t-pregunta">
            ¿Dónde está haciendo esfuerzo de más el cliente para poder comprar, recibir
            atención o avanzar?
          </blockquote>

          <div className="t-grid3 t-grid-areas">
            {AREAS_IFC.map(a => (
              <div key={a.nombre} className="t-area">
                <h3>{a.nombre}</h3>
                <p className="t-areaq">{a.pregunta}</p>
                <p className="t-aread">{a.detalle}</p>
              </div>
            ))}
          </div>

          <p className="t-metodo-pie">
            El IFC se aplica <strong>antes</strong> de implementar nada. Primero se diagnostica
            la fricción; después se decide qué conviene resolver con mejor proceso, qué con
            automatización y qué con software. A veces la respuesta es que no
            hace falta tecnología todavía.
          </p>
        </div>
      </section>

      {/* ---------------- Trabajas directamente conmigo ---------------- */}
      <section className="t-sec" id="conmigo">
        <div className="t-wrap">
          <div className="t-head">
            <p className="t-eyebrow">Quién está detrás</p>
            <h2>Trabajas directamente conmigo</h2>
          </div>

          <div className="t-conmigo">
            <div className="t-bio">
              <p>
                Soy <strong>Irving de los Santos Reyes</strong>, consultor en automatización
                de procesos. Cognitia no es una agencia con capas de por medio:
                la persona que diagnostica tu operación es la misma que te acompaña después.
              </p>
              <p>
                Vengo de nueve años en hospitalidad de ultra-lujo en la Riviera Maya —siete en
                Banyan Tree Mayakoba y dos en EDITION Kanai— donde el estándar era uno solo:
                que el cliente nunca espere, nunca repita su información y nunca sienta que no
                lo estaban esperando. Ese estándar es el origen del IFC.
              </p>
              <p>
                Trabajo desde Playa del Carmen, presencial en la Riviera Maya y en remoto para
                el resto del país.
              </p>
              <Link to="/contacto" className="t-btn">Cuéntame sobre tu negocio</Link>
            </div>

            <figure className="t-grupo">
              <img
                src="/taller-grupo-1600.jpg"
                srcSet="/taller-grupo-760.jpg 760w, /taller-grupo-1100.jpg 1100w, /taller-grupo-1600.jpg 1600w"
                sizes="(max-width: 900px) 100vw, 55vw"
                alt="Grupo de participantes al terminar un taller para dueños de negocio impartido por Cognitia."
                width="1564" height="1006" loading="lazy" decoding="async"
              />
              <figcaption>
                Cierre de uno de los talleres para dueños de negocio. Las personas de la foto
                asistieron a la sesión.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="t-cta" id="contacto">
        <div className="t-wrap t-cta-in">
          <h2>Cuéntame qué quieres mejorar en tu negocio</h2>
          <p>
            Una conversación para entender tu caso y decirte si puedo ayudarte. Si no es así,
            también te lo digo.
          </p>
          <div className="t-actions">
            <Link to="/contacto" className="t-btn t-btn-claro">Cuéntame sobre tu negocio</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="t-btn-ghost t-ghost-claro">
              Escríbeme por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  )
}

