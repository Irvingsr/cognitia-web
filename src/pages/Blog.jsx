import { Link } from 'react-router-dom'
import { posts, formatDate } from '../data/posts'

const categoryColors = {
  'Fundamentos':     { bg: 'rgba(123,92,245,0.12)', color: '#c084fc' },
  'Casos prácticos': { bg: 'rgba(0,219,130,0.12)',  color: '#34d399' },
  'Estrategia':      { bg: 'rgba(0,194,255,0.12)',  color: '#00C2FF' },
  'Herramientas':    { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24' },
  'Real Estate':     { bg: 'rgba(0,194,255,0.12)',  color: '#00C2FF' },
}

export default function Blog() {
  return (
    <div className="page-bg">

      {/* Header */}
      <section style={s.header}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label label-electric animate-fade-in-up d1">Blog</span>
          <h1 className="animate-fade-in-up d2">IA aplicada.<br />Sin tecnicismos.</h1>
          <p style={s.sub} className="animate-fade-in-up d3">
            Artículos prácticos para dueños de negocio que quieren entender la IA<br />
            y usarla para crecer — no para impresionar en una conferencia.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section style={s.body}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={s.empty}>
              <p style={{ color: 'var(--muted)' }}>Pronto habrá contenido aquí. Mientras tanto, agenda tu diagnóstico gratuito.</p>
              <Link to="/diagnostico" className="btn-primary" style={{ marginTop: 20 }}>
                Hacer el diagnóstico →
              </Link>
            </div>
          ) : (
            <div style={s.grid}>
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} featured={i === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom */}
      <section style={s.cta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', marginBottom: 12 }}>
            ¿Listo para aplicarlo en tu negocio?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 15 }}>
            Leer es el primer paso. El segundo es una conversación de 30 minutos.
          </p>
          <Link to="/diagnostico" className="btn-primary">
            Hacer el diagnóstico gratuito →
          </Link>
        </div>
      </section>

    </div>
  )
}

function PostCard({ post, featured }) {
  const cat = categoryColors[post.category] || categoryColors['Fundamentos']

  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <div className="glass-card" style={featured ? s.cardFeatured : s.card}>
        {/* Category badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ ...s.badge, background: cat.bg, color: cat.color }}>
            {post.category}
          </span>
          <span style={s.readTime}>{post.readTime} lectura</span>
        </div>

        {/* Title */}
        <h2 style={featured ? s.titleFeatured : s.title}>{post.title}</h2>

        {/* Excerpt */}
        <p style={s.excerpt}>{post.excerpt}</p>

        {/* Footer */}
        <div style={s.cardFooter}>
          <span style={s.author}>{post.author}</span>
          <span style={s.date}>{formatDate(post.date)}</span>
        </div>

        {/* CTA */}
        <div style={s.readMore}>
          Leer artículo <span style={{ color: 'var(--electric)' }}>→</span>
        </div>
      </div>
    </Link>
  )
}

const s = {
  header: { padding: '100px 0 48px' },
  sub: { color: 'var(--muted)', fontSize: 16, marginTop: 14, lineHeight: 1.7 },
  body: { padding: '40px 0 64px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 28,
  },
  empty: { textAlign: 'center', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  card: { height: '100%', display: 'flex', flexDirection: 'column' },
  cardFeatured: { height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'rgba(0,194,255,0.2)' },
  badge: {
    fontSize: 11, fontWeight: 700, padding: '3px 10px',
    borderRadius: 10, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  readTime: { fontSize: 12, color: 'var(--muted)' },
  title: {
    fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem',
    letterSpacing: 1, lineHeight: 1.2, color: 'var(--text)', marginBottom: 12,
  },
  titleFeatured: {
    fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.7rem',
    letterSpacing: 1, lineHeight: 1.2, color: 'var(--text)', marginBottom: 12,
  },
  excerpt: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, flex: 1 },
  cardFooter: {
    display: 'flex', justifyContent: 'space-between',
    marginTop: 20, paddingTop: 16,
    borderTop: '1px solid var(--glass-border)',
    fontSize: 12, color: 'var(--muted)',
  },
  author: { fontWeight: 600 },
  date: {},
  readMore: {
    marginTop: 14, fontSize: 13, fontWeight: 700,
    color: 'var(--text)',
  },
  cta: {
    padding: '48px 0 96px',
    borderTop: '1px solid var(--glass-border)',
  },
}
