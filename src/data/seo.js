// Fuente única de metadata por ruta.
// El componente <Seo> la aplica en cliente y el prerender la hornea en el HTML inicial.
// Cualquier cambio de title/description/canonical se hace AQUÍ, no en las páginas.

// Host canónico. Es `www` porque el dominio en Vercel redirige apex -> www a nivel
// de dominio; declarar el apex aquí apuntaría el canonical a una URL que redirige.
// Si algún día se invierte ese redirect en el panel, basta cambiar esta constante.
export const SITE_URL = 'https://www.cognitiamx.com'
export const SITE_NAME = 'Cognitia'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

/** Construye una URL absoluta y canónica a partir de una ruta. */
export function absoluteUrl(path = '/') {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const seo = {
  '/': {
    title: 'Consultoría en automatización de procesos en Playa del Carmen | Cognitia',
    description:
      'Que ningún cliente se te pierda por responder tarde o por olvidar un seguimiento. Diagnóstico y automatización de procesos para negocios en Playa del Carmen.',
  },
  '/diagnostico': {
    title: 'Diagnóstico de procesos para tu negocio | Cognitia',
    description:
      'Analizamos tu operación y te entregamos prioridades, oportunidades y un plan de 30/60/90 días antes de que inviertas en herramientas o software.',
  },
  '/scorecard': {
    title: 'Evaluación gratuita de tus procesos | Cognitia',
    description:
      'Responde unas preguntas y descubre en qué punto está tu negocio. Es una evaluación inicial: no sustituye al Diagnóstico Estratégico Cognitia.',
  },
  '/servicios': {
    title: 'Automatización de procesos y seguimiento comercial | Cognitia',
    description:
      'Diagnóstico, estrategia, implementación y adopción. Automatizamos solo lo que el diagnóstico justifica, no lo que está de moda.',
  },
  '/metodo': {
    title: 'Cómo decidir qué automatizar en tu negocio | Método Cognitia',
    description:
      'Diagnóstico, prioridades, estrategia, implementación y medición. Así decidimos qué conviene automatizar — y qué no.',
  },
  '/nosotros': {
    title: 'Consultor en automatización de procesos en Playa del Carmen | Cognitia',
    description:
      'Irving de los Santos Reyes, consultor en automatización de procesos. Proyectos reales, metodología propia y trabajo cercano desde Playa del Carmen.',
  },
  '/contacto': {
    title: 'Contacta a Cognitia | Consultoría en automatización de procesos',
    description:
      'Cuéntanos qué quieres mejorar en tu negocio. Respondemos por WhatsApp o correo y te decimos si podemos ayudarte.',
  },
  '/calculadora': {
    title: 'Calculadora de impacto | Cognitia',
    description:
      'Estima de forma orientativa cuánto tiempo y cuántas oportunidades podrías estar perdiendo hoy. Punto de partida, no diagnóstico.',
  },
  '/blog': {
    title: 'Blog | Cognitia',
    description:
      'Artículos prácticos sobre automatización, seguimiento comercial y procesos, escritos sin tecnicismos para dueños de negocio.',
  },
  '/manifiesto': {
    title: 'Manifiesto | Cognitia',
    description:
      'En qué creemos y cómo trabajamos con los negocios que acompañamos.',
  },
}

/** Metadata de una ruta. Si no está registrada, devuelve la del Home. */
export function seoFor(path) {
  return seo[path] || seo['/']
}
