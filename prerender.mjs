/**
 * Prerender estático post-build.
 *
 * Por qué: el sitio es una SPA. Sin esto, el HTML servido es un shell vacío y todo
 * crawler queda obligado a depender del renderizado JavaScript. Google lo ejecuta,
 * pero no debemos asumir esa capacidad en el resto de crawlers ni en los motores de
 * respuesta. Este script hornea el HTML final de cada ruta —contenido, H1, title,
 * description y canonical autorreferencial— en archivos estáticos.
 *
 * Cómo: levanta `vite preview` sobre dist/, visita cada ruta con Chromium, espera a
 * que React monte y guarda el DOM resultante en dist/<ruta>/index.html.
 *
 * Uso: npm run build (se ejecuta solo, después de `vite build`).
 */
import { chromium } from 'playwright'
import { preview } from 'vite'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, 'dist')
const PORT = 4319

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

/** Lee los slugs del blog para prerenderizar cada post. */
async function blogRoutes() {
  const src = await readFile(join(__dirname, 'src/data/posts.js'), 'utf8')
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map(m => `/blog/${m[1]}`)
}

/** Convierte una ruta en la ubicación de su archivo dentro de dist/. */
function outputPath(route) {
  if (route === '/') return join(DIST, 'index.html')
  return join(DIST, route.slice(1), 'index.html')
}

async function run() {
  const routes = [...STATIC_ROUTES, ...(await blogRoutes())]
  console.log(`\nPrerender · ${routes.length} rutas\n`)

  const server = await preview({
    preview: { port: PORT, strictPort: true },
    logLevel: 'error',
  })
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const results = []
  let failed = 0

  for (const route of routes) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' })
      // El contenido real vive dentro de #root; esperamos a que React lo monte.
      await page.waitForSelector('#root h1', { timeout: 15000 })

      const html = await page.content()
      const title = await page.title()
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute('href')
        .catch(() => null)

      const file = outputPath(route)
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, html, 'utf8')

      results.push({ route, title, canonical, bytes: html.length })
      console.log(`  ✓ ${route.padEnd(42)} ${String(html.length).padStart(7)} B`)
    } catch (err) {
      failed++
      console.error(`  ✗ ${route} — ${err.message.split('\n')[0]}`)
    }
  }

  // 404: se genera aparte porque no tiene <h1> garantizado en el mismo punto del ciclo
  // y Vercel lo sirve con el status correcto ante cualquier ruta no encontrada.
  try {
    await page.goto(`http://localhost:${PORT}/__404__`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    const html = await page.content()
    await writeFile(join(DIST, '404.html'), html, 'utf8')
    console.log(`  ✓ ${'404.html'.padEnd(42)} ${String(html.length).padStart(7)} B`)
  } catch (err) {
    failed++
    console.error(`  ✗ 404.html — ${err.message.split('\n')[0]}`)
  }

  await browser.close()
  await server.httpServer.close()

  console.log(`\nPrerender completo · ${results.length} ok · ${failed} con error\n`)
  if (failed > 0) process.exit(1)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
