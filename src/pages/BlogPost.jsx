import { useParams, Link, Navigate } from 'react-router-dom'
import { getPost, formatDate } from '../data/posts'
import { lazy, Suspense } from 'react'

// Importa dinámicamente el contenido del post según el slug
function loadPostContent(slug) {
  return lazy(() =>
    import(`../posts/${slug}.jsx`).catch(() => ({
      default: () => <p style={{ color: 'var(--muted)' }}>Contenido no disponible.</p>
    }))
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <Navigate to="/blog" replace />

  const PostContent = loadPostContent(slug)

  return (
    <div className="page-bg">

      {/* Header del post */}
      <section style={s.header}>
        <div className="container" style={{ maxWidth: 780 }}>

          {/* Breadcrumb */}
          <div style={s.breadcrumb}>
            <Link to="/" style={s.breadLink}>Inicio</Link>
            <span style={s.breadSep}>/</span>
            <Link to="/blog" style={s.breadLink}>Blog</Link>
            <span style={s.breadSep}>/</span>
            <span style={{ color: 'var(--muted)' }}>{post.category}</span>
          </div>

          {/* Category + read time */}
          <div style={s.meta}>
            <span style={s.category}>{post.category}</span>
            <span style={s.metaSep}>·</span>
            <span style={s.metaText}>{post.readTime} de lectura</span>
            <span style={s.metaSep}>·</span>
            <span style={s.metaText}>{formatDate(post.date)}</span>
          </div>

          {/* Title */}
          <h1 style={s.title}>{post.title}</h1>

          {/* Excerpt */}
          <p style={s.excerpt}>{post.excerpt}</p>

          {/* Author */}
          <div style={s.authorRow}>
            <div style={s.authorAvatar}>I</div>
            <div>
              <p style={s.authorName}>{post.author}</p>
              <p style={s.authorRole}>Fundador · Cognitia</p>
            </div>
          </div>

        </div>
      </section>

      {/* Separador */}
      <div style={s.divider} />

      {/* Contenido del post */}
      <section style={s.body}>
        <div className="container" style={{ maxWidth: 780 }}>
          <Suspense fallback={<div style={{ color: 'var(--muted)', padding: '40px 0' }}>Cargando...</div>}>
            <div style={s.content} className="post-content">
              <PostContent />
            </div>
          </Suspense>

          {/* CTA dentro del post */}
          <div style={s.ctaBox}>
            <p style={s.ctaLabel}>¿Quieres aplicar esto en tu negocio?</p>
            <h3 style={s.ctaTitle}>Diagnostica tu operación en 2 minutos</h3>
            <p style={s.ctaText}>
              Descubre exactamente qué procesos puedes automatizar y qué impacto tendría en tu negocio.
              Gratis, sin compromiso.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
              <Link to="/diagnostico" className="btn-primary">
                Hacer el diagnóstico →
              </Link>
              <a
                href="https://wa.me/529841798638"
                target="_blank" rel="noreferrer"
                className="btn-secondary"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>

          {/* Volver al blog */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--glass-border)' }}>
            <Link to="/blog" style={s.backLink}>
              ← Volver al blog
            </Link>
          </div>

        </div>
      </section>

    </div>
  )
}

const s = {
  header: { padding: '80px 0 40px' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, fontSize: 13 },
  breadLink: { color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' },
  breadSep: { color: 'var(--glass-border)', margin: '0 2px' },
  meta: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  category: {
    fontSize: 11, fontWeight: 700, padding: '3px 10px',
    borderRadius: 10, textTransform: 'uppercase', letterSpacing: 0.8,
    background: 'rgba(0,194,255,0.12)', color: '#00C2FF',
  },
  metaSep: { color: 'var(--glass-border)' },
  metaText: { fontSize: 13, color: 'var(--muted)' },
  title: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    letterSpacing: 1.5, lineHeight: 1.1,
    color: 'var(--text)', marginBottom: 20,
  },
  excerpt: { fontSize: 18, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 },
  authorRow: { display: 'flex', alignItems: 'center', gap: 12 },
  authorAvatar: {
    width: 40, height: 40, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--purple), var(--electric))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0,
  },
  authorName: { fontWeight: 700, fontSize: 14, color: 'var(--text)' },
  authorRole: { fontSize: 12, color: 'var(--muted)' },
  divider: { height: 1, background: 'var(--glass-border)', margin: '0 auto', maxWidth: 780 },
  body: { padding: '48px 0 80px' },
  content: { lineHeight: 1.8 },
  ctaBox: {
    marginTop: 56,
    background: 'linear-gradient(135deg, rgba(123,92,245,0.08), rgba(0,194,255,0.06))',
    border: '1px solid rgba(123,92,245,0.25)',
    borderRadius: 20, padding: '32px 36px',
  },
  ctaLabel: { fontSize: 11, fontWeight: 700, color: 'var(--electric)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  ctaTitle: { fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', letterSpacing: 1, marginBottom: 8 },
  ctaText: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 },
  backLink: { fontSize: 14, fontWeight: 600, color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' },
}
