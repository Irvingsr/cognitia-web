# CLAUDE.md — Proyecto Web COGNITIA
## Contexto maestro para Claude Code

> Lee este archivo completo antes de tocar cualquier archivo del proyecto.
> Actualizado: 29 de septiembre de 2026 — Irving de los Santos
>
> Este es el ÚNICO archivo de contexto del repo. No existen MEMORY.md ni AGENTS.md: no los busques.

---

## ANTES DE EMPEZAR (obligatorio)

1. **La lista de tareas NO vive aquí.** Está en la hoja de arranque:
   `C:\Users\HP\OneDrive\Escritorio\RETOMAR WEB COGNITIA.txt` → sección **"LO QUE SIGUE"**.
2. **Valida el estado real antes de trabajar:** `git status`, `git log --oneline -5` y `git branch -vv`.
   Si hay archivos modificados sin commit, son trabajo ya terminado: revísalos con `git diff` y propón un commit.
   No los rehagas ni los descartes.
3. Antes de tratar un pendiente como trabajo nuevo, comprueba en el código si ya está resuelto.

---

## PROYECTO

| | |
|---|---|
| Sitio | cognitiamx.com (producción = rama `main`) |
| Carpeta de código | `C:\Users\HP\dev\cognitia-web` (la carpeta `WEB_CognitiaMX` de OneDrive solo tiene documentación) |
| Repo | github.com/Irvingsr/cognitia-web |
| Rama de trabajo | `diseno/home-taller` |
| Deploy | Vercel. Push a `main` = producción. Push a otra rama = preview |
| Cuenta Vercel | PERSONAL (Hotmail), workspace `irving-sr-s-projects`. La cuenta de empresa tiene un duplicado sin repo: no usarlo |
| Dev local | `npm run dev` → http://localhost:5173 |
| Build con prerender | `npm run build` → `npx serve dist` |

### Ramas
- `main`: producción. El 29-sep-2026 se publicó ahí todo el rediseño y la auditoría (PR #3).
  Punto de regreso: tag `produccion-antes-rediseno` o Instant Rollback en Vercel.
- `diseno/home-taller`: rama de trabajo. Flujo: commit → push (preview) → Irving revisa →
  PR a `main` → Irving dice "publícalo" → merge y verificación en vivo.
- `seo/p0-indexacion` y `brand/ux-conversion`: ya incluidas en `main`; obsoletas.

---

## REGLAS DURAS

1. **Nunca hacer push a `main` ni mergear a `main`** sin que Irving lo pida explícitamente en ese turno.
2. **Push de cualquier rama:** solo cuando Irving lo pida.
3. No introducir dependencias npm nuevas sin consultarlo.
4. Leer el archivo completo antes de modificarlo.
5. No romper el responsive: revisar móvil (375px) y tablet (768px).
6. Usar siempre las variables CSS de `src/styles/taller.css`. Nunca hardcodear colores.
7. **Dominio principal = `https://www.cognitiamx.com`** (decidido 29-sep-2026). Toda URL absoluta sale de
   `SITE_URL` en `src/data/seo.js`. Nunca escribir la versión sin www a mano.
8. Datos de contacto: solo en `src/data/contacto.js` (se propagan a cabecera, pie, contacto, blog y chat).
9. **Aviso de Privacidad (`src/pages/Privacidad.jsx`):** si cambia qué datos personales recoge el sitio
   (formularios, chat) o a qué servicio se envían (`api/*.js`), actualizar el aviso y su fecha.
10. Antes de construir algo nuevo, listar puntos ciegos (frontend, backend, dominio).

---

## STACK TÉCNICO

```
Framework:    React 18 + Vite 5
Routing:      React Router v6 (páginas separadas)
Prerender:    prerender.mjs con react-dom/server (src/entry-server.jsx) → HTML estático en dist/
SEO:          src/data/seo.js (títulos/meta por ruta, SITE_URL) + src/components/Seo.jsx
              Schema JSON-LD en index.html. sitemap.xml se genera en el build desde las rutas reales
              llms.txt también se genera en el build (prerender.mjs) desde seo.js, posts.js y contacto.js:
              no se edita a mano; un post nuevo aparece solo
CSS:          src/styles/taller.css (diseño actual) + src/index.css (base heredada)
Fuentes:      DM Sans (Google Fonts)
Backend:      Vercel Serverless Functions (/api)
```

### API (/api) y variables de entorno en Vercel
| Archivo | Qué hace | Variables |
|---|---|---|
| `chat.js` | Proxy del chat flotante hacia la API de Anthropic, con rate limiting | `ANTHROPIC_API_KEY` |
| `contact.js` | Formulario de contacto → webhook de Make.com | `MAKE_WEBHOOK_URL` |
| `lead.js` | Leads del ChatWidget → resumen con Claude → Make.com | `ANTHROPIC_API_KEY`, `MAKE_WEBHOOK_URL` |

> Las claves van SOLO en Vercel → Project Settings → Environment Variables. Nunca en el código ni en el repo.

---

## ESTRUCTURA

```
api/                chat.js, contact.js, lead.js
public/             robots.txt, imágenes, og-image, favicon
prerender.mjs       Prerender + generación de sitemap
src/
  App.jsx           Rutas
  entry-server.jsx  Entrada para el prerender
  styles/taller.css Todo el CSS del diseño "Taller"
  data/
    contacto.js     Teléfono / WhatsApp / email (fuente única)
    seo.js          Títulos y metas por ruta, SITE_URL
    posts.js        Índice del blog
  components/       TallerNav, TallerFoot, Seo, ChatWidget, WhatsAppFlotante, Logo, ErrorBoundary
  pages/            Home, Servicios, Manifiesto, Diagnostico, Scorecard, Calculadora,
                    Contacto, Blog, BlogPost, Privacidad, NotFound
  posts/            que-es-un-agente-de-ia, automatizar-whatsapp-negocio,
                    ia-agencias-inmobiliarias-riviera-maya
```

### Rutas
`/` · `/servicios` · `/manifiesto` · `/diagnostico` · `/scorecard` · `/calculadora` · `/contacto` · `/blog` · `/blog/:slug` · `/privacidad` · `*` (404)

> Ruta nueva = agregarla en `src/App.jsx`, en `STATIC_ROUTES` de `prerender.mjs` y en `src/data/seo.js`.

---

## BLOG — cómo agregar un post

1. Crear `src/posts/[slug].jsx` con el contenido en JSX.
2. Registrar el post en `src/data/posts.js` (slug, title, excerpt, date, category, readTime, author).
3. El sitemap y `llms.txt` se regeneran solos en `npm run build`. No hay que editarlos a mano.

La skill `cognitia-blog-semanal` genera el JSX listo para pegar.

---

## IDENTIDAD DE MARCA

### Paleta actual (diseño "Taller", en `src/styles/taller.css`)
Colores oficiales del logo: **morado `#7B5CF5`** + **azul `#5B8DEF`**. Fondo marfil claro.

```css
--marfil:#F6F4EE;  --marfil-2:#EFEDE5;  --blanco:#FFFFFF;
--verde:#7B5CF5;      /* acento principal (el nombre es histórico: hoy es morado) */
--verde-osc:#5B44C9;  --salvia:#EFEAFE;  --salvia-borde:#DCD1F7;
--tinta:#252C28;  --tinta-2:#5A6560;  --borde:#E2DFD6;  --radio:12px;
```

> La paleta oscura vieja (`--electric`, `--dark`, glassmorphism) ya NO es la dirección del sitio.
> No reintroducirla.

### Reglas de marca
- La marca habla de TRANSFORMACIONES, no de tecnología.
- No mencionar "ChatGPT" como herramienta de COGNITIA: COGNITIA usa Claude (Anthropic).
  **Excepción (decidida 29-sep-2026):** en la oferta de **capacitación** sí se nombra junto a Claude y
  Gemini (ej. el panel "Servicios" de `TallerNav.jsx`), porque son las herramientas que usan los equipos
  que se capacitan. No quitarlo de ahí.
- En el blog se quitó la palabra "IA" (se dice "agente digital" / "automatización").
  El "IA" resaltado del logo sigue pendiente de decidir.
- "MX" solo en email y dominio.
- Schema `areaServed`: Playa del Carmen, Quintana Roo y Tabasco (decisión del commit d000b8e).

---

## DATOS DE CONTACTO

```
Teléfono/WhatsApp:  +52 985 251 4602   (fuente: src/data/contacto.js)
Email:              irvingsr@cognitiamx.com
Calendly:           https://calendly.com/irvingsr-cognitiamx/llamada-de-consultoria-cognitia-30-min
Fundador:           Irving de los Santos
```

---

*Pendientes y estado de la sesión → hoja de arranque "RETOMAR WEB COGNITIA.txt" (Escritorio).*
