import { Link } from 'react-router-dom'
import { posts, formatDate } from '../data/posts'

export default function Blog() {
  return (
    <>
      <section className="t-hero t-sec-first">
        <div className="t-wrap t-hero-in t-hero-solo" style={{ textAlign: 'center', margin: '0 auto' }}>
          <p className="t-eyebrow" style={{ justifyContent: 'center' }}>Blog</p>
          <h1>Procesos que funcionan. Sin tecnicismos.</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            Artículos prácticos para dueños de negocio que quieren dejar de perder
            clientes por responder tarde o por olvidar un seguimiento.
          </p>
        </div>
      </section>

      <section className="t-sec t-sec-first">
        <div className="t-wrap">
          {posts.length === 0 ? (
            <div className="t-blog-empty">
              <p className="t-cardtxt">Pronto habrá contenido aquí. Mientras tanto, agenda tu diagnóstico gratuito.</p>
              <Link to="/diagnostico" className="t-btn" style={{ marginTop: 20 }}>
                Hacer el diagnóstico →
              </Link>
            </div>
          ) : (
            <div className="t-blog-grid">
              {posts.map(post => <PostCard key={post.slug} post={post} />)}
            </div>
          )}
        </div>
      </section>

      <section className="t-cta">
        <div className="t-wrap t-cta-in">
          <h2>¿Listo para aplicarlo en tu negocio?</h2>
          <p>Leer es el primer paso. El segundo es una conversación de 30 minutos.</p>
          <Link to="/diagnostico" className="t-btn t-btn-claro">Hacer el diagnóstico gratuito →</Link>
        </div>
      </section>
    </>
  )
}

function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="t-blog-card">
      <span className="t-blog-cat">{post.category}</span>
      <h3>{post.title}</h3>
      <p className="t-blog-excerpt">{post.excerpt}</p>
      <div className="t-blog-meta">
        <span>{post.author}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  )
}
