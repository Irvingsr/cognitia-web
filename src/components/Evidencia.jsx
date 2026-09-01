import { Link } from 'react-router-dom'

/**
 * Bloque de evidencia.
 *
 * Responde "¿por qué esto importa ahora?" justo antes de pedir una decisión
 * comercial. Los tres datos provienen de la misma fuente primaria: la OECD ICT
 * Access and Usage Database, publicada el 28 de enero de 2026. Se citan tal como
 * los publica la OCDE, sin extrapolar a México ni atribuirlos a Cognitia.
 *
 * Fuente única para los tres datos:
 * https://www.oecd.org/en/about/news/announcements/2026/01/ai-use-by-individuals-surges-across-the-oecd-as-adoption-by-firms-continues-to-expand.html
 */

const FUENTE_URL =
  'https://www.oecd.org/en/about/news/announcements/2026/01/ai-use-by-individuals-surges-across-the-oecd-as-adoption-by-firms-continues-to-expand.html'

const DATOS = [
  {
    cifra: '20.2%',
    titulo: 'de las empresas de la OCDE ya usaba IA en 2025',
    contexto:
      'Eran 8.7% en 2023. La adopción se duplicó con creces en dos años: dejó de ser un experimento aislado y pasó a ser práctica común.',
  },
  {
    cifra: '17.4%',
    titulo: 'en empresas pequeñas, frente a 52.0% en empresas grandes',
    contexto:
      'La brecha no es de interés, es de capacidad de ejecución. Las grandes tienen quien decida dónde aplicarla; la mayoría de las pequeñas, no.',
    resaltado: true,
  },
  {
    cifra: '41.1%',
    titulo: 'de las personas empleadas ya usa IA generativa',
    contexto:
      'Cuatro de cada diez trabajadores usan estas herramientas. En muchas empresas la IA ya entró — sin criterio, sin proceso y sin que nadie lo decidiera.',
  },
]

export default function Evidencia() {
  return (
    <section className="section" style={s.section}>
      <div className="container">
        <div style={s.head}>
          <p className="label label-electric">Por qué importa ahora</p>
          <h2 style={s.title}>
            La adopción ya ocurrió. La ventaja está en <span className="grad-electric">saber dónde aplicarla</span>
          </h2>
          <p style={s.intro}>
            Estos son los datos más recientes de la OCDE sobre adopción de inteligencia
            artificial en empresas. No son resultados de Cognitia: son el contexto en el que
            hoy compite tu negocio.
          </p>
        </div>

        <div style={s.grid}>
          {DATOS.map((d, i) => (
            <div key={i} className="card" style={{ ...s.card, ...(d.resaltado ? s.cardHi : {}) }}>
              <span style={{ ...s.cifra, ...(d.resaltado ? s.cifraHi : {}) }}>{d.cifra}</span>
              <p style={s.dTitulo}>{d.titulo}</p>
              <p style={s.dContexto}>{d.contexto}</p>
            </div>
          ))}
        </div>

        <p style={s.fuente}>
          Fuente:{' '}
          <a href={FUENTE_URL} target="_blank" rel="noreferrer" style={s.fuenteLink}>
            OCDE — ICT Access and Usage Database
          </a>
          , 28 de enero de 2026. Datos de 2025 para los países de la OCDE con información
          disponible.
        </p>

        <div style={s.cierre}>
          <p style={s.cierreTexto}>
            El problema ya no es conseguir la herramienta: está al alcance de cualquiera. El
            problema es saber <strong>en qué procesos aplicarla</strong>, integrarla en la
            operación real y lograr que el equipo la use. Ese es exactamente el trabajo que
            hacemos.
          </p>
          <Link to="/diagnostico" className="btn-primary">
            Solicitar Diagnóstico Estratégico →
          </Link>
        </div>
      </div>
    </section>
  )
}

const s = {
  section: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  head: { maxWidth: 760, marginBottom: 40 },
  title: { marginTop: 14, marginBottom: 18 },
  intro: { color: 'var(--muted)', fontSize: 16, lineHeight: 1.8 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
  },
  card: { padding: 30, display: 'flex', flexDirection: 'column', gap: 10 },
  cardHi: {
    borderColor: 'rgba(0,194,255,0.34)',
    background: 'linear-gradient(150deg, rgba(0,194,255,0.07), rgba(123,92,245,0.05))',
  },
  cifra: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '3.4rem',
    lineHeight: 1,
    letterSpacing: 1,
    color: 'var(--text)',
    fontVariantNumeric: 'tabular-nums',
  },
  cifraHi: { color: 'var(--electric)' },
  dTitulo: { fontSize: 15.5, fontWeight: 600, lineHeight: 1.5, color: 'var(--text)' },
  dContexto: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 },
  fuente: { marginTop: 22, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 680 },
  fuenteLink: { color: 'var(--muted)', textDecoration: 'underline' },
  cierre: {
    marginTop: 44,
    paddingTop: 34,
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
  },
  cierreTexto: { fontSize: 17, lineHeight: 1.75, color: 'var(--text)', maxWidth: 700 },
}
