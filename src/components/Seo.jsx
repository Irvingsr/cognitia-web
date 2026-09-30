import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoFor, absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from '../data/seo'

/** Crea o actualiza una etiqueta <meta> del head. */
function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Crea o actualiza el <link rel="canonical">. */
function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Aplica title, description, canonical autorreferencial y Open Graph de la ruta actual.
 * Se monta una sola vez en App y reacciona a cada cambio de ruta.
 *
 * Las páginas con metadata dinámica (ej. un post del blog) pueden pasar overrides.
 */
export default function Seo({ title, description, image, type = 'website', noindex = false }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const base = seoFor(pathname)
    const finalTitle = title || base.title
    const finalDescription = description || base.description
    const finalImage = image || DEFAULT_OG_IMAGE
    const canonical = absoluteUrl(pathname)

    document.title = finalTitle
    setMeta('name', 'description', finalDescription)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setCanonical(canonical)

    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:title', finalTitle)
    setMeta('property', 'og:description', finalDescription)
    setMeta('property', 'og:image', finalImage)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'es_MX')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', finalTitle)
    setMeta('name', 'twitter:description', finalDescription)
    setMeta('name', 'twitter:image', finalImage)
  }, [pathname, title, description, image, type, noindex])

  return null
}
