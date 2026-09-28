import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { WHATSAPP_URL, TELEFONO_DISPLAY, TELEFONO_E164, EMAIL, UBICACION } from '../data/contacto'

/**
 * Home — dirección visual "Taller".
 *
 * Marfil cálido de base, verde profundo como único acento, fotografía real de
 * talleres y tipografía humanista de ancho normal. Los estilos viven en el
 * bloque <style> de abajo, acotados a `.taller`, para que esta página pueda
 * convivir con el resto del sitio (que sigue en oscuro) sin interferir.
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
  const [menu, setMenu] = useState(false)

  return (
    <div className="taller">
      {/* ---------------- Cabecera ---------------- */}
      <header className="t-nav">
        <div className="t-wrap t-nav-in">
          <Link to="/" className="t-logo" aria-label="Cognitia — inicio">
            <Logo size={28} id="taller-logo" tone="oscuro" />
          </Link>

          <nav className="t-links" data-tlinks="">
            <Link to="/servicios">Servicios</Link>
            <Link to="/diagnostico">Diagnóstico</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>

          <div className="t-navcta">
            <a href={`tel:${TELEFONO_E164}`} className="t-tel">{TELEFONO_DISPLAY}</a>
            <Link to="/contacto" className="t-btn t-btn-sm">Cuéntame sobre tu negocio</Link>
          </div>

          <button
            className="t-burger"
            data-tburger=""
            onClick={() => setMenu(m => !m)}
            aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menu}
          >
            <span /><span /><span />
          </button>
        </div>

        {menu && (
          <div className="t-mobile">
            <Link to="/servicios" onClick={() => setMenu(false)}>Servicios</Link>
            <Link to="/diagnostico" onClick={() => setMenu(false)}>Diagnóstico</Link>
            <Link to="/blog" onClick={() => setMenu(false)}>Blog</Link>
            <Link to="/contacto" onClick={() => setMenu(false)}>Contacto</Link>
            <a href={`tel:${TELEFONO_E164}`}>{TELEFONO_DISPLAY}</a>
            <Link to="/contacto" className="t-btn" onClick={() => setMenu(false)}>Cuéntame sobre tu negocio</Link>
          </div>
        )}
      </header>

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
                Soy <strong>Irving de los Santos Reyes</strong>, consultor de inteligencia
                artificial para negocios. Cognitia no es una agencia con capas de por medio:
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

      {/* ---------------- Pie ---------------- */}
      <footer className="t-foot">
        <div className="t-wrap t-foot-in">
          <div className="t-foot-brand">
            <Logo size={26} id="taller-foot" tone="oscuro" />
            <p>Consultoría en automatización de procesos para negocios.</p>
          </div>

          <div className="t-foot-col">
            <p className="t-foot-t">Navegación</p>
            <Link to="/servicios">Servicios</Link>
            <Link to="/diagnostico">Diagnóstico Estratégico</Link>
            <Link to="/scorecard">Evaluación gratuita</Link>
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
        </div>
        <div className="t-wrap t-foot-legal">
          <span>© {new Date().getFullYear()} Cognitia — EstrategIA Consulting</span>
          <span>cognitiamx.com</span>
        </div>
      </footer>

      <style>{CSS}</style>
    </div>
  )
}

const CSS = `
.taller{
  --marfil:#F6F4EE;
  --marfil-2:#EFEDE5;
  --blanco:#FFFFFF;
  --verde:#234B40;
  --verde-osc:#1B3A31;
  --salvia:#DCE6DF;
  --salvia-borde:#C3D3C7;
  --tinta:#252C28;
  --tinta-2:#5A6560;
  --borde:#E2DFD6;
  --radio:12px;
  background:var(--marfil);
  color:var(--tinta);
  font-family:'DM Sans',system-ui,-apple-system,sans-serif;
  min-height:100vh;
  font-size:17px;
  line-height:1.65;
  letter-spacing:-0.002em;
}
.taller *{box-sizing:border-box}
.taller h1,.taller h2,.taller h3{font-family:'DM Sans',system-ui,sans-serif;color:var(--tinta);margin:0}
.taller p{margin:0}
.taller a{color:inherit;text-decoration:none}
.taller img{display:block;max-width:100%;height:auto}
.taller a:focus-visible,.taller button:focus-visible{outline:2px solid var(--verde);outline-offset:3px;border-radius:4px}

.t-wrap{width:min(1160px,100% - 44px);margin:0 auto}

/* ---- botones ---- */
.taller .t-btn{
  display:inline-flex;align-items:center;justify-content:center;
  background:var(--verde);color:#fff;
  padding:14px 26px;border-radius:100px;
  font-size:15.5px;font-weight:600;line-height:1;
  transition:background .18s ease,transform .18s ease;
  white-space:nowrap;
}
.taller .t-btn:hover{background:var(--verde-osc);transform:translateY(-1px)}
.taller .t-btn-sm{padding:10px 18px;font-size:14px}
.taller .t-btn-claro{background:#fff;color:var(--verde)}
.taller .t-btn-claro:hover{background:var(--marfil)}
.taller .t-btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;
  padding:14px 24px;border-radius:100px;
  border:1px solid var(--verde);color:var(--verde);
  font-size:15.5px;font-weight:600;line-height:1;
  transition:background .18s ease;
}
.taller .t-btn-ghost:hover{background:rgba(35,75,64,.07)}
.taller .t-ghost-claro{border-color:rgba(255,255,255,.5);color:#fff}
.taller .t-ghost-claro:hover{background:rgba(255,255,255,.12)}

/* ---- cabecera ---- */
.t-nav{
  position:sticky;top:0;z-index:100;
  background:rgba(246,244,238,.92);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--borde);
}
.t-nav-in{display:flex;align-items:center;gap:28px;height:74px}
.t-logo{flex-shrink:0;display:flex;align-items:center}
.t-links{display:flex;gap:26px;margin-left:auto}
.t-links a{font-size:15px;font-weight:500;color:var(--tinta-2);transition:color .16s}
.t-links a:hover{color:var(--verde)}
.t-navcta{display:flex;align-items:center;gap:18px}
.taller .t-tel{font-size:14.5px;font-weight:600;color:var(--verde);white-space:nowrap}
.t-burger{display:none;flex-direction:column;gap:5px;background:none;border:0;cursor:pointer;padding:8px;margin-left:auto}
.t-burger span{width:22px;height:2px;background:var(--tinta);border-radius:2px;display:block}
.t-mobile{
  display:flex;flex-direction:column;gap:4px;
  padding:14px 22px 22px;border-top:1px solid var(--borde);background:var(--marfil);
}
.t-mobile a{padding:11px 0;font-size:16px;font-weight:500;border-bottom:1px solid var(--borde)}
.t-mobile a.t-btn{margin-top:14px;border-bottom:0;justify-content:center}

/* ---- hero ---- */
.t-hero{padding:76px 0 84px}
.t-hero-in{display:grid;grid-template-columns:1fr 1.05fr;gap:64px;align-items:center}
.t-eyebrow{
  font-size:12.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  color:var(--verde);margin-bottom:18px;
}
.t-eyebrow-verde{color:var(--verde)}
.taller h1{
  font-size:clamp(34px,4.6vw,52px);line-height:1.13;font-weight:600;
  letter-spacing:-.022em;text-wrap:balance;margin-bottom:22px;
}
.t-lead{font-size:18px;line-height:1.72;color:var(--tinta-2);max-width:52ch}
.t-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}
.t-micro{font-size:14px;color:var(--tinta-2);margin-top:20px;max-width:46ch;line-height:1.6}

.t-hero-fig{margin:0}
.t-hero-fig img{
  width:100%;border-radius:var(--radio);
  border:1px solid var(--borde);
  box-shadow:0 1px 2px rgba(37,44,40,.04),0 18px 44px -26px rgba(37,44,40,.35);
}
.t-hero-fig figcaption,.t-grupo figcaption{
  font-size:13px;color:var(--tinta-2);margin-top:12px;line-height:1.55;
}

/* ---- secciones ---- */
.t-sec{padding:84px 0;border-top:1px solid var(--borde)}
.t-head{max-width:62ch;margin-bottom:44px}
.taller h2{
  font-size:clamp(26px,3.3vw,38px);line-height:1.2;font-weight:600;
  letter-spacing:-.018em;text-wrap:balance;
}
.t-sub{font-size:17px;line-height:1.7;color:var(--tinta-2);margin-top:16px}

.t-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.t-card{
  background:var(--blanco);border:1px solid var(--borde);border-radius:var(--radio);
  padding:30px 28px;display:flex;flex-direction:column;
}
.t-quote{
  font-size:15px;font-style:italic;color:var(--tinta-2);line-height:1.6;
  padding-bottom:18px;margin-bottom:18px;border-bottom:1px solid var(--borde);
}
.t-card h3{font-size:19.5px;font-weight:600;line-height:1.3;margin-bottom:12px}
.t-cardtxt{font-size:15.5px;line-height:1.7;color:var(--tinta-2);flex:1}
.t-entrega{
  margin-top:22px;padding-top:18px;border-top:1px solid var(--borde);
  font-size:14.5px;font-weight:600;color:var(--verde);line-height:1.5;
}
.t-entrega span{
  display:block;font-size:11.5px;font-weight:600;letter-spacing:.09em;
  text-transform:uppercase;color:var(--tinta-2);margin-bottom:5px;
}

/* ---- método ---- */
.t-metodo{background:var(--salvia);padding:84px 0;border-top:1px solid var(--salvia-borde)}
.t-metodo .t-card,.t-metodo .t-area{background:rgba(255,255,255,.62)}
.t-pregunta{
  margin:0 0 40px;padding:24px 30px;
  background:rgba(255,255,255,.62);border-left:3px solid var(--verde);
  border-radius:0 var(--radio) var(--radio) 0;
  font-size:20px;line-height:1.55;font-weight:500;color:var(--tinta);max-width:60ch;
}
.t-area{border:1px solid var(--salvia-borde);border-radius:var(--radio);padding:28px 26px}
.t-area h3{font-size:19px;font-weight:600;margin-bottom:10px;color:var(--verde)}
.t-areaq{font-size:15.5px;font-weight:500;line-height:1.6;margin-bottom:10px}
.t-aread{font-size:14.5px;line-height:1.7;color:var(--tinta-2)}
.t-metodo-pie{
  margin-top:36px;font-size:16px;line-height:1.75;color:var(--tinta-2);max-width:70ch;
}
.t-metodo-pie strong{color:var(--tinta)}

/* ---- conmigo ---- */
.t-conmigo{display:grid;grid-template-columns:.85fr 1.15fr;gap:56px;align-items:start}
.t-bio p{font-size:16.5px;line-height:1.78;color:var(--tinta-2);margin-bottom:18px}
.t-bio strong{color:var(--tinta);font-weight:600}
.t-bio .t-btn{margin-top:12px}
.t-grupo{margin:0}
/* La proporción coincide con la del original: la foto entra completa, sin recortar a nadie. */
.t-grupo img{
  width:100%;aspect-ratio:1564/1006;object-fit:cover;object-position:center;
  border-radius:var(--radio);border:1px solid var(--borde);
  box-shadow:0 1px 2px rgba(37,44,40,.04),0 18px 44px -26px rgba(37,44,40,.35);
}

/* ---- cta ---- */
.t-cta{background:var(--verde);color:#fff;padding:80px 0}
.t-cta-in{text-align:center;display:flex;flex-direction:column;align-items:center}
.t-cta h2{color:#fff;max-width:20ch}
.t-cta p{font-size:17.5px;line-height:1.7;color:rgba(255,255,255,.82);margin-top:16px;max-width:52ch}
.t-cta .t-actions{justify-content:center}

/* ---- pie ---- */
.t-foot{background:var(--marfil-2);border-top:1px solid var(--borde);padding:56px 0 0}
.t-foot-in{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:44px}
.t-foot-brand p{font-size:15px;color:var(--tinta-2);margin-top:16px;line-height:1.65;max-width:34ch}
.t-foot-col{display:flex;flex-direction:column;gap:10px}
.t-foot-t{
  font-size:11.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  color:var(--tinta);margin-bottom:6px;
}
.t-foot-col a,.t-foot-col span{font-size:15px;color:var(--tinta-2);transition:color .16s}
.t-foot-col a:hover{color:var(--verde)}
.t-foot-legal{
  display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;
  margin-top:48px;padding:22px 0 28px;border-top:1px solid var(--borde);
  font-size:13.5px;color:var(--tinta-2);
}

/* ---- responsive ---- */
@media (max-width:980px){
  .t-hero-in{grid-template-columns:1fr;gap:44px}
  .t-conmigo{grid-template-columns:1fr;gap:36px}
  .t-grid3{grid-template-columns:1fr 1fr}
  .t-foot-in{grid-template-columns:1fr 1fr;gap:34px}
}
@media (max-width:820px){
  .t-links,.t-navcta{display:none}
  .t-burger{display:flex}
}
@media (max-width:700px){
  .taller{font-size:16.5px}
  .t-hero{padding:52px 0 60px}
  .t-sec,.t-metodo{padding:60px 0}
  .t-grid3{grid-template-columns:1fr}
  .t-foot-in{grid-template-columns:1fr;gap:32px}
  .t-actions{flex-direction:column;align-items:stretch}
  .t-actions .t-btn,.t-actions .t-btn-ghost{width:100%}
  .t-pregunta{font-size:18px;padding:20px 22px}
  .t-cta{padding:60px 0}
}
@media (prefers-reduced-motion:reduce){
  .taller *{transition:none!important}
}
`
