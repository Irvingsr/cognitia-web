// Rate limiting en memoria (se resetea por cada instancia serverless)
const rateMap = new Map()
const RATE_LIMIT = 10      // máx requests
const RATE_WINDOW = 60000  // por minuto (ms)

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip) || { count: 0, start: now }
  if (now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, start: now })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  rateMap.set(ip, entry)
  return true
}

function sanitizeText(str, maxLen = 2000) {
  if (typeof str !== 'string') return ''
  // Eliminar caracteres de control y limitar longitud
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').slice(0, maxLen)
}

function validateMessages(messages) {
  if (!Array.isArray(messages)) return false
  if (messages.length > 20) return false  // máx historial
  return messages.every(m =>
    typeof m === 'object' &&
    ['user', 'assistant'].includes(m.role) &&
    typeof m.content === 'string' &&
    m.content.length <= 2000
  )
}

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Headers de seguridad
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  // Rate limiting por IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta en un minuto.' })
  }

  // Verificar API key
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Servicio no disponible' })
  }

  // Validar Content-Type
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(400).json({ error: 'Content-Type inválido' })
  }

  const { model, max_tokens, system, messages } = req.body || {}

  // Validar modelo (solo permitir modelos Anthropic autorizados)
  const ALLOWED_MODELS = ['claude-haiku-4-5', 'claude-sonnet-4-6']
  if (!ALLOWED_MODELS.includes(model)) {
    return res.status(400).json({ error: 'Modelo no permitido' })
  }

  // Limitar max_tokens
  const safeTokens = Math.min(Number(max_tokens) || 300, 500)

  // Validar y sanitizar mensajes
  if (!validateMessages(messages)) {
    return res.status(400).json({ error: 'Mensajes inválidos' })
  }

  const cleanMessages = messages.map(m => ({
    role: m.role,
    content: sanitizeText(m.content),
  }))

  // Sanitizar system prompt (solo usamos el nuestro, ignoramos el del cliente si es muy largo)
  const systemPrompt = typeof system === 'string' && system.length < 12000
    ? sanitizeText(system, 12000)
    : 'Eres el asistente de COGNITIA. Responde en español.'

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: safeTokens,
        system: systemPrompt,
        messages: cleanMessages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Anthropic API error:', response.status, JSON.stringify(data))
      const status = response.status === 429 ? 429 : 502
      return res.status(status).json({ error: 'Error al procesar tu mensaje' })
    }

    return res.status(200).json(data)
  } catch {
    return res.status(502).json({ error: 'Error de conexión. Intenta de nuevo.' })
  }
}
