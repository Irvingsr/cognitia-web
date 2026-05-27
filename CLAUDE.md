# CLAUDE.md — Proyecto Web COGNITIA
## Contexto maestro para Claude Code

> Lee este archivo completo antes de tocar cualquier archivo del proyecto.
> Actualizado: Mayo 2026 — Irving de los Santos

---

## PROYECTO

**Sitio:** cognitiamx.com
**Repositorio:** github.com/Irvingsr/cognitia-web
**Deploy:** Vercel automático desde rama `main`
**Dominio:** Registrado en Hostinger — DNS cambiados a `ns1.vercel-dns.com` / `ns2.vercel-dns.com` (en propagación)
**Dev local:** `npm run dev` → http://localhost:5173
**Preview Vercel:** https://cognitia-web-lemon.vercel.app

---

## STACK TÉCNICO ACTUAL

```
Framework:    React 18 + Vite 5
Routing:      React Router v6 (páginas separadas, no SPA de scroll)
CSS:          index.css con variables nativas — NO Tailwind, NO CSS Modules
Backend:      Vercel Serverless Functions (carpeta /api)
Hosting:      Vercel (gratuito) — cuenta IrvingSR
Repo:         github.com/Irvingsr/cognitia-web
Fuentes:      Google Fonts CDN — Bebas Neue + DM Sans
Chat IA:      Anthropic Claude API → proxy en /api/chat.js
Contacto:     Formulario → /api/contact.js → Make.com webhook
Agendamiento: Calendly
```

> IMPORTANTE: Sitio migrado de HTML vanilla a React+Vite en Mayo 2026.
> El `index.html` en la raíz es solo el entry point de Vite — NO contiene el sitio.
> Todo el código vive en `src/`.

---

## ESTRUCTURA DE ARCHIVOS DEL REPO

```
cognitia-web/
├── api/
│   ├── chat.js           ← Proxy seguro Anthropic API (rate limiting + sanitización)
│   └── contact.js        ← Handler formulario de contacto (→ Make.com webhook)
├── public/
│   ├── robots.txt        ← User-agent: * Allow: / + Sitemap
│   ├── sitemap.xml       ← 8 URLs (6 páginas + /blog + 2 posts)
│   ├── og-image.jpg      ← 1200×630px — imagen para OG tags y Twitter Cards
│   ├── favicon.svg
│   └── [imágenes PNG]    ← Fotos de talleres (movidas de raíz a public/)
├── src/
│   ├── main.jsx          ← Entry point React
│   ├── App.jsx           ← Router principal + layout (Nav, blobs, Footer)
│   ├── index.css         ← Tokens CSS, glassmorphism, componentes base, post-content
│   ├── data/
│   │   └── posts.js      ← Índice de posts del blog (metadatos + helper functions)
│   ├── posts/            ← Contenido JSX de cada post (lazy loaded)
│   │   ├── que-es-un-agente-de-ia.jsx
│   │   └── automatizar-whatsapp-negocio.jsx
│   ├── components/
│   │   ├── Nav.jsx       ← Navegación sticky con links a páginas (incluye Blog)
│   │   └── Footer.jsx    ← Footer con contacto y redes
│   └── pages/
│       ├── Home.jsx      ← Hero + stats + terminal mockup + servicios + CTA
│       ├── Servicios.jsx ← Cards de servicios AaaS
│       ├── Manifiesto.jsx← Historia y valores de Cognitia
│       ├── Diagnostico.jsx← Test de 3 pasos con score y roadmap personalizado
│       ├── Calculadora.jsx← Calculadora ROI con 3 sliders
│       ├── Contacto.jsx  ← Formulario + WhatsApp + Calendly
│       ├── Blog.jsx      ← Listado de posts con cards por categoría
│       └── BlogPost.jsx  ← Plantilla individual: breadcrumb, contenido, CTA
├── vercel.json           ← Rewrites SPA + headers de seguridad HTTP
├── vite.config.js
└── package.json          ← v2.0.0, React 18, React Router 6, Playwright (devDep)
```

---

## RUTAS DEL SITIO

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Hero principal, stats, mockup terminal, servicios |
| `/servicios` | Servicios | Catálogo AaaS completo |
| `/manifiesto` | Manifiesto | Historia, valores, por qué Cognitia |
| `/diagnostico` | Diagnostico | Test de madurez IA + score + roadmap |
| `/calculadora` | Calculadora | ROI estimado con sliders interactivos |
| `/contacto` | Contacto | Formulario + canales directos |
| `/blog` | Blog | Listado de posts |
| `/blog/:slug` | BlogPost | Artículo individual |

---

## SISTEMA DE BLOG

**Cómo agregar un nuevo post:**

1. Crear `src/posts/[slug].jsx` con el contenido en JSX
2. Agregar registro en `src/data/posts.js`:
```js
{
  slug: 'mi-nuevo-post',
  title: 'Título del post',
  excerpt: 'Descripción breve de 1-2 líneas.',
  date: 'YYYY-MM-DD',
  category: 'Fundamentos' | 'Casos prácticos' | 'Estrategia' | 'Herramientas',
  readTime: 'X min',
  author: 'Irving de los Santos',
}
```
3. Agregar URL al `public/sitemap.xml`
4. Commit + push → deploy automático

**Nota:** El contenido del chat normal con la skill `cognitia-blog-semanal` genera el JSX listo para pegar en `src/posts/`.

---

## VARIABLES DE ENTORNO (Vercel)

```
ANTHROPIC_API_KEY   → Key de Anthropic para el chat flotante (/api/chat.js)
MAKE_WEBHOOK_URL    → Webhook de Make.com para el formulario (/api/contact.js)
```

> Ambas van en Vercel Dashboard → Project Settings → Environment Variables.
> NUNCA se ponen en el código ni en el repo.
> ⚠️ ANTHROPIC_API_KEY aún NO está configurada en Vercel — chat flotante pendiente.

---

## IDENTIDAD DE MARCA

### Paleta de colores (usar SIEMPRE estas variables CSS)

```css
--electric:  #00C2FF;   /* Acento principal */
--purple:    #7B5CF5;   /* Gradientes, botones secundarios */
--blue-mid:  #5B8DEF;   /* Gradientes secundarios */
--dark:      #060C18;   /* Fondo base del sitio */
--dark2:     #0B1121;   --dark3:     #0D1628;   --dark4:     #111D35;
--text:      #E8F0FE;   --muted:     #7A8FAD;   --success:   #00DB82;
--glass-bg:  hsla(240,16%,8%,0.7);    --glass-border: hsla(240,10%,60%,0.08);
```

### Reglas de marca (CRÍTICO)
- **Sin regionalismos** — jamás "para negocios mexicanos", "PyMEs mexicanas", etc.
- "MX" solo en email y dominio por disponibilidad
- La marca habla de TRANSFORMACIONES, no de tecnología
- Nunca mencionar "ChatGPT" — COGNITIA usa Claude (Anthropic)
- `areaServed: "Worldwide"` en Schema JSON-LD

### Clases CSS base disponibles (index.css)
```
.glass-panel / .glass-card   → Glassmorphism
.btn-primary / .btn-secondary / .btn-success
.label / .label-purple/electric/success/muted
.grad-electric/success/purple → Texto gradiente
.animate-fade-in-up + .d1–.d4 → Animaciones de entrada
.range-slider / .custom-checkbox / .form-input
.calc-main-grid              → Grid Calculadora (colapsa en móvil)
.contact-main-grid           → Grid Contacto (colapsa en móvil)
.form-row-2col               → Filas de formulario (colapsa en móvil)
.post-content                → Estilos tipográficos para artículos del blog
.section / .section-sm / .container / .page-bg
.grid-2 / .grid-3            → Grids responsive
```

---

## NOTA CRÍTICA — FONDO ANIMADO (scroll bug resuelto)

El fondo funciona porque:
- `body { background: var(--dark); overflow-x: hidden; }` — sólido, NO transparent
- `#root` — SIN overflow configurado (no clip, no hidden)
- `.background-blobs { position: fixed; z-index: 0; top:0; left:0; width:100%; height:100%; }`
- `<main style={{ position: 'relative', zIndex: 1 }}>` — contenido encima
- **NUNCA usar `overflow-x: clip` en body ni #root** — rompe position:fixed en Chrome

---

## DATOS DE CONTACTO

```
WhatsApp:   +52 984 179 8638  /  wa.me/529841798638
Email:      irvingsr@cognitiamx.com
Calendly:   https://calendly.com/irvingsr-cognitiamx/llamada-de-consultoria-cognitia-30-min
Web:        cognitiamx.com
GitHub:     github.com/Irvingsr/cognitia-web
Vercel:     cognitia-web-lemon.vercel.app
Fundador:   Irving de los Santos
```

---

## REGLAS DE TRABAJO PARA CLAUDE CODE

1. Leer el archivo relevante completo antes de modificarlo
2. Nunca romper responsive — revisar móvil (375px) y tablet (768px)
3. No introducir nuevas dependencias npm sin consultarlo
4. Usar siempre variables CSS — nunca hardcodear colores
5. Al crear nuevas páginas: copiar estructura de una existente (ej. Blog.jsx)
6. El fondo animado está en App.jsx — no repetirlo por página
7. **Antes de construir algo nuevo:** listar puntos ciegos (frontend, backend, dominio)

---

## FLUJO DE DEPLOY

```bash
# Trabajar desde: C:\Users\HP\OneDrive\Documentos\GitHub\cognitia-web
npm run dev          # Dev local en localhost:5173
npm run build        # Verificar que no hay errores antes de hacer commit
git add [archivos]
git commit -m "descripción"
git push origin main
# Vercel detecta el push → deploy automático en ~60 segundos
```

> Git auth: credenciales de GitHub en Windows Credential Manager.
> Si da error 403, eliminar credenciales en Panel de control → Administrador de credenciales → Credenciales de Windows → github.com

---

## ESTADO ACTUAL — Mayo 2026

### ✅ Completado
- [x] Migración completa a React + Vite con páginas separadas
- [x] Proxy seguro Anthropic API (/api/chat.js) con rate limiting
- [x] Backend: sanitización, honeypot, headers HTTP (vercel.json)
- [x] Diagnóstico interactivo con score y roadmap personalizado
- [x] Calculadora ROI con 3 sliders y citas McKinsey 2024
- [x] Formulario de contacto con handler serverless
- [x] SEO: meta tags sin regionalismos, canonical, robots meta
- [x] Open Graph completo + Twitter Cards
- [x] og-image.jpg (1200×630px) con branding Cognitia
- [x] Schema JSON-LD (ProfessionalService, areaServed: Worldwide)
- [x] robots.txt y sitemap.xml con todas las rutas
- [x] DNS Hostinger → Vercel (en propagación)
- [x] Responsive móvil corregido (Calculadora + Contacto)
- [x] Blog: estructura completa con 2 posts iniciales

### 🔴 Pendiente — Alta prioridad
- [ ] Confirmar que cognitiamx.com resuelve a Vercel (DNS propagación)
- [ ] Agregar ANTHROPIC_API_KEY en Vercel → activar chat flotante
- [ ] Agregar MAKE_WEBHOOK_URL en Vercel → activar formulario de contacto
- [ ] Construir el widget de chat flotante (llama a /api/chat.js)

### 🟡 Pendiente — Media prioridad
- [ ] Página 404 personalizada con branding Cognitia
- [ ] Política de privacidad
- [ ] Convertir imágenes PNG a WebP (public/*.png → WebP, target <200KB)
- [ ] Activar Vercel Analytics
- [ ] Registrar en Google Search Console + enviar sitemap

### 🟢 Pendiente — Baja prioridad
- [ ] Sección de precios / paquetes en /servicios
- [ ] Configurar correo Google Workspace con dominio
- [ ] Agregar más posts al blog (usar skill cognitia-blog-semanal en chat normal)

---

*Repositorio: github.com/Irvingsr/cognitia-web*
*Última actualización: Mayo 2026 — Irving de los Santos*
