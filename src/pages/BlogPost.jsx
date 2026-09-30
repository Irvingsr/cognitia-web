import { useParams, Link, Navigate } from 'react-router-dom'
import { getPost, formatDate } from '../data/posts'
import Seo from '../components/Seo'
import { WHATSAPP_URL } from '../data/contacto'
import { SITE_URL, absoluteUrl, DEFAULT_OG_IMAGE } from '../data/seo'

/**
 * Schema BlogPosting del post. Va en el cuerpo (no en el head) para que el prerender
 * lo hornee en el HTML sin tocar la plantilla; Google lo lee igual en cualquier lugar.
 * El publisher apunta por @id al negocio declarado en index.html.
 */
function blogPostingSchema(post) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: DEFAULT_OG_IMAGE,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: 'es-MX',
    url,
    mainEntityOfPage: url,
    author: { '@type': 'Person', name: post.author, url: absoluteUrl('/manifiesto') },
    publisher: { '@id': `${SITE_URL}/#business` },
  })
  // Evita que un "</script>" dentro del texto cierre la etiqueta antes de tiempo.
  return json.replace(/</g, '\\u003c')
}

// Contenido de los posts, resuelto en tiempo de build.
// Eager (no lazy) para que el cuerpo del artículo también quede en el HTML
// prerenderizado; con carga diferida el prerender solo guardaría el fallback.
const POST_MODULES = import.meta.glob('../posts/*.jsx', { eager: true })

function getPostContent(slug) {
  const mod = POST_MODULES[`../posts/${slug}.jsx`]
  return mod?.default || (() => (
    <p className="t-cardtxt">Contenido no disponible.</p>
  ))
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <Navigate to="/blog" replace />

  const PostContent = getPostContent(slug)

  return (
    <>
      {/* Metadata propia del post — si no, heredaría la del Home */}
      <Seo
        title={`${post.title} | Cognitia`}
        description={post.excerpt}
        type="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogPostingSchema(post) }}
      />

      <section className="t-sec t-sec-first" style={{ paddingBottom: 0 }}>
        <div className="t-wrap" style={{ maxWidth: 780 }}>
          <p className="t-breadcrumb">
            <Link to="/">Inicio</Link> / <Link to="/blog">Blog</Link> / {post.category}
          </p>

          <span className="t-blog-cat">{post.category}</span>
          <h1 style={{ marginTop: 16 }}>{post.title}</h1>
          <p className="t-lead" style={{ maxWidth: 'none' }}>{post.excerpt}</p>

          <div className="t-post-meta">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} de lectura</span>
          </div>
        </div>
      </section>

      <section className="t-sec">
        <div className="t-wrap" style={{ maxWidth: 780 }}>
          <div className="t-post-content">
            <PostContent />
          </div>

          <div style={{ background: 'var(--salvia)', border: '1px solid var(--salvia-borde)', borderRadius: 'var(--radio)', padding: '32px 36px', marginTop: 48 }}>
            <p className="t-eyebrow t-eyebrow-verde">¿Quieres aplicar esto en tu negocio?</p>
            <h3>Empieza por entender qué te está frenando</h3>
            <p className="t-cardtxt" style={{ marginTop: 10 }}>
              El Diagnóstico Estratégico analiza tu operación y te entrega prioridades y un
              plan de acción antes de que inviertas en tecnología.
            </p>
            <div className="t-actions">
              <Link to="/diagnostico" className="t-btn">Solicitar Diagnóstico Estratégico →</Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="t-btn-ghost">
                Hablar por WhatsApp
              </a>
            </div>
          </div>

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--borde)' }}>
            <Link to="/blog" className="t-quicklink">← Volver al blog</Link>
          </div>
        </div>
      </section>
    </>
  )
}
