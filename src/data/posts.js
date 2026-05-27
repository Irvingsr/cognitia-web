// Índice de posts del blog de Cognitia
// Para agregar un nuevo post:
// 1. Crea el archivo en src/posts/[slug].jsx
// 2. Agrega un registro aquí con los metadatos
// 3. El post aparece automáticamente en /blog

export const posts = [
  {
    slug: 'que-es-un-agente-de-ia',
    title: '¿Qué es un agente de IA y cómo puede trabajar en tu negocio?',
    excerpt: 'Sin tecnicismos: qué son los agentes de IA, cómo funcionan y por qué un negocio como el tuyo ya puede usarlos hoy — sin contratar a nadie nuevo.',
    date: '2026-05-26',
    category: 'Fundamentos',
    readTime: '5 min',
    author: 'Irving de los Santos',
  },
  {
    slug: 'automatizar-whatsapp-negocio',
    title: '5 conversaciones de WhatsApp que tu negocio puede automatizar esta semana',
    excerpt: 'El 80% de los mensajes que responden tus colaboradores son siempre los mismos. Aquí los 5 más comunes y cómo un agente los resuelve sin que tú intervengas.',
    date: '2026-05-26',
    category: 'Casos prácticos',
    readTime: '4 min',
    author: 'Irving de los Santos',
  },
]

export function getPost(slug) {
  return posts.find(p => p.slug === slug)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
