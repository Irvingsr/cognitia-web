/**
 * Punto de entrada para el prerender.
 *
 * Renderiza la app a HTML en Node, sin navegador. Se usa solo en build:
 * el navegador sigue arrancando por src/main.jsx.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { seoFor, absoluteUrl, DEFAULT_OG_IMAGE } from './data/seo.js'
import { getPost } from './data/posts.js'

/** HTML de la app para una ruta dada. */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}

/**
 * Metadata final de una ruta.
 *
 * En SSR no corren los efectos, así que el componente <Seo> no toca el head.
 * El prerender inyecta estos valores directamente en la plantilla; en cliente,
 * <Seo> reproduce exactamente lo mismo al navegar.
 */
export function getMeta(url) {
  const canonical = absoluteUrl(url)

  const blogMatch = url.match(/^\/blog\/(.+)$/)
  if (blogMatch) {
    const post = getPost(blogMatch[1])
    if (post) {
      return {
        title: `${post.title} | Cognitia`,
        description: post.excerpt,
        canonical,
        type: 'article',
        image: DEFAULT_OG_IMAGE,
      }
    }
  }

  const base = seoFor(url)
  return {
    title: base.title,
    description: base.description,
    canonical,
    type: 'website',
    image: DEFAULT_OG_IMAGE,
  }
}
