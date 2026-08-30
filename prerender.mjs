/**
 * Prerender estático post-build.
 *
 * Por qué: el sitio es una SPA. Sin esto, el HTML servido es un shell vacío y todo
 * crawler queda obligado a depender del renderizado JavaScript. Google lo ejecuta,
 * pero no debemos asumir esa capacidad en el resto de crawlers ni en los motores de
 * respuesta. Este script hornea el HTML final de cada ruta —contenido, H1, title,
 * description y canonical autorreferencial— en archivos estáticos.
 *
 * Cómo: renderiza la app con react-dom/server (sin navegador, para que funcione
 * igual en local y en el build de Vercel) e inyecta el resultado y su metadata en
 * la plantilla generada por Vite.
 *
 * Uso: npm run build (se ejecuta solo, después de `vite build`).
 */
import { createServer } from 'vite'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, 'dist')

/** Rutas estáticas. Debe coincidir con las de src/App.jsx. */
const STATIC_ROUTES = [
  '/',
  '/servicios',
  '/diagnostico',
  '/scorecard',
  '/calculadora',
  '/manifiesto',
  '/contacto',
  '/blog',
]

/** Escapa texto que va dentro de un atributo HTML. */
function attr(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Escapa texto que va dentro de un nodo HTML. */
function text(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Sustituye en la plantilla la metadata por la de esta ruta. */
function applyMeta(template, meta) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${text(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${attr(meta.description)}">`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${attr(meta.canonical)}" />`
    )
    .replace(
      /<meta property="og:type"\s+content="[^"]*">/,
      `<meta property="og:type" content="${attr(meta.type)}">`
    )
    .replace(
      /<meta property="og:url"\s+content="[^"]*">/,
      `<meta property="og:url" content="${attr(meta.canonical)}">`
    )
    .replace(
      /<meta property="og:title"\s+content="[^"]*">/,
      `<meta property="og:title" content="${attr(meta.title)}">`
    )
    .replace(
      /<meta property="og:description"\s+content="[^"]*">/,
      `<meta property="og:description" content="${attr(meta.description)}">`
    )
    .replace(
      /<meta name="twitter:title"\s+content="[^"]*">/,
      `<meta name="twitter:title" content="${attr(meta.title)}">`
    )
    .replace(
      /<meta name="twitter:description"\s+content="[^"]*">/,
      `<meta name="twitter:description" content="${attr(meta.description)}">`
    )
}

/** Ubicación del archivo de una ruta dentro de dist/. */
function outputPath(route) {
  if (route === '/') return join(DIST, 'index.html')
  return join(DIST, route.slice(1), 'index.html')
}

async function run() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  const { render, getMeta } = await vite.ssrLoadModule('/src/entry-server.jsx')
  const { posts } = await vite.ssrLoadModule('/src/data/posts.js')

  const routes = [...STATIC_ROUTES, ...posts.map(p => `/blog/${p.slug}`)]
  console.log(`\nPrerender · ${routes.length} rutas\n`)

  let failed = 0

  for (const route of routes) {
    try {
      const appHtml = render(route)
      const meta = getMeta(route)
      const html = applyMeta(template, meta).replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      )

      const file = outputPath(route)
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, html, 'utf8')
      console.log(`  ✓ ${route.padEnd(42)} ${String(html.length).padStart(7)} B`)
    } catch (err) {
      failed++
      console.error(`  ✗ ${route} — ${err.message.split('\n')[0]}`)
      if (process.env.PRERENDER_DEBUG) console.error(err.stack)
    }
  }

  // 404: Vercel lo sirve con status 404 ante cualquier ruta no encontrada.
  try {
    const appHtml = render('/__404__')
    const html = applyMeta(template, {
      title: 'Página no encontrada | Cognitia',
      description: 'La página que buscas no existe o cambió de lugar.',
      canonical: 'https://cognitiamx.com/',
      type: 'website',
    })
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, follow">')

    await writeFile(join(DIST, '404.html'), html, 'utf8')
    console.log(`  ✓ ${'404.html'.padEnd(42)} ${String(html.length).padStart(7)} B`)
  } catch (err) {
    failed++
    console.error(`  ✗ 404.html — ${err.message.split('\n')[0]}`)
  }

  await vite.close()

  console.log(`\nPrerender completo · ${routes.length - failed} ok · ${failed} con error\n`)
  if (failed > 0) process.exit(1)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
