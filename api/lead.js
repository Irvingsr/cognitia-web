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

/**
 * Genera un resumen del lead con IA (Claude Haiku), a partir de la conversación.
 * Extrae Negocio / Dolor / Interés / Sector en 3-4 líneas limpias.
 * Si algo falla (sin API key, API caída, timeout) devuelve null y el caller
 * usa un respaldo de texto crudo — un lead NUNCA se pierde por culpa del resumen.
 */
async function generarResumen(conversacion) {
  if (!Array.isArray(conversacion) || conversacion.length === 0) return null

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  // Transcript legible de la conversación (un solo bloque, máx ~3500 chars)
  const transcript = conversacion
    .map(m => `${m.role === 'user' ? 'Cliente' : 'Asesor'}: ${typeof m.content === 'string' ? m.content : ''}`)
    .join('\n')
    .slice(0, 3500)

  const system = `Eres un analista de leads de Cognitia, una consultoría de IA. A partir de la conversación entre un Cliente y el Asesor virtual del sitio, redacta un resumen del lead en español, en texto plano, máximo 4 líneas, sin relleno ni saludos. Usa EXACTAMENTE este formato:
Negocio: <qué negocio tiene el cliente, o "no especificado">
Dolor: <el problema u operación que le cuesta, o "no especificado">
Interés: <qué busca o qué tan caliente está el lead>
Sector: <clínicas / inmobiliario / B2B / otro, e interés ALTO/MEDIO/BAJO>
Si la conversación es muy corta o vaga, infiere con prudencia y marca lo que falte como "no especificado". No inventes datos.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 200,
        system,
        messages: [{ role: 'user', content: `Conversación:\n\n${transcript}` }],
      }),
    })

    if (!response.ok) {
      console.error('[lead.js] generarResumen: Anthropic respondió', response.status)
      return null
    }

    const data = await response.json()
    const texto = data?.content?.[0]?.text
    return typeof texto === 'string' && texto.trim() ? texto.trim() : null
  } catch (err) {
    console.error('[lead.js] generarResumen falló:', err)
    return null
  }
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

  // Resumen del lead con IA. Si falla, respaldo = último mensaje crudo (lo de antes).
  const resumenIA = await generarResumen(conversacion)
  const resumenRespaldo = Array.isArray(conversacion) && conversacion.length > 0
    ? `"${sanitize(conversacion.filter(m => m.role === 'user').slice(-1)[0]?.content || '', 200)}"`
    : 'Sin mensajes previos'

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
    resumen: resumenIA ? sanitize(resumenIA, 600) : resumenRespaldo,
    timestamp,
    fuente: sanitize(fuente || 'cognitiamx.com', 100),
    accion_sugerida: `WhatsApp: https://wa.me/52${sanitize(whatsapp, 20).replace(/\D/g, '')}`,
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
