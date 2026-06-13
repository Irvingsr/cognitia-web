/**
 * /api/lead.js — Cognitia Lead Capture
 * Recibe datos de un lead desde el ChatWidget y los reenvía a Make.com
 */

const ALLOWED_ORIGINS = [
  'https://cognitiamx.com',
  'https://www.cognitiamx.com',
  'https://cognitia-web-lemon.vercel.app',
]

// Rate limiting simple por IP
const rateLimitMap = new Map()
const RATE_LIMIT = 3       // máximo 3 leads por IP
const RATE_WINDOW = 60 * 60 * 1000  // en 1 hora

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.firstRequest > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

function sanitize(str, maxLen = 200) {
  if (typeof str !== 'string') return ''
  return str.trim().slice(0, maxLen).replace(/[<>]/g, '')
}

export default async function handler(req, res) {
  // CORS
  const origin = req.headers.origin
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Rate limit
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta más tarde.' })
  }

  const { nombre, whatsapp, email, conversacion, fuente } = req.body || {}

  // Validación básica
  if (!nombre || !whatsapp) {
    return res.status(400).json({ error: 'Nombre y WhatsApp son requeridos.' })
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('[lead.js] MAKE_WEBHOOK_URL no configurada')
    return res.status(500).json({ error: 'Configuración pendiente.' })
  }

  // Construir payload para Make.com
  const timestamp = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })

  const payload = {
    nombre: sanitize(nombre, 100),
    whatsapp: sanitize(whatsapp, 30),
    email: sanitize(email || '', 150),
    conversacion: Array.isArray(conversacion)
      ? conversacion.slice(-6).map(m => ({
          rol: m.role === 'user' ? 'Cliente' : 'Asistente',
          mensaje: sanitize(m.content, 300),
        }))
      : [],
    resumen: Array.isArray(conversacion) && conversacion.length > 0
      ? `"${sanitize(conversacion.filter(m => m.role === 'user').slice(-1)[0]?.content || '', 200)}"`
      : 'Sin mensajes previos',
    timestamp,
    fuente: sanitize(fuente || 'cognitiamx.com', 100),
    accion_sugerida: `WhatsApp: https://wa.me/52${sanitize(whatsapp, 20).replace(/\D/g, '')}${email ? ` | Email: ${sanitize(email, 150)}` : ''}`,
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('[lead.js] Make.com respondió con error:', response.status)
      return res.status(502).json({ error: 'Error al enviar el lead.' })
    }

    return res.status(200).json({ ok: true, message: 'Lead registrado correctamente.' })
  } catch (err) {
    console.error('[lead.js] Error al enviar a Make.com:', err)
    return res.status(500).json({ error: 'Error interno.' })
  }
}
