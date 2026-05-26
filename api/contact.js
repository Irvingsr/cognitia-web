// Rate limiting para el formulario de contacto
const contactRateMap = new Map()
const CONTACT_LIMIT = 3       // máx envíos
const CONTACT_WINDOW = 300000 // por 5 minutos (ms)

function checkContactRate(ip) {
  const now = Date.now()
  const entry = contactRateMap.get(ip) || { count: 0, start: now }
  if (now - entry.start > CONTACT_WINDOW) {
    contactRateMap.set(ip, { count: 1, start: now })
    return true
  }
  if (entry.count >= CONTACT_LIMIT) return false
  entry.count++
  contactRateMap.set(ip, entry)
  return true
}

function sanitize(str, maxLen = 500) {
  if (typeof str !== 'string') return ''
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F<>]/g, '').trim().slice(0, maxLen)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown'
  if (!checkContactRate(ip)) {
    return res.status(429).json({ error: 'Demasiados envíos. Intenta en 5 minutos.' })
  }

  const { nombre, email, telefono, negocio, mensaje } = req.body || {}

  // Validaciones requeridas
  const cleanNombre = sanitize(nombre, 100)
  const cleanEmail  = sanitize(email, 254)
  const cleanTel    = sanitize(telefono, 20)
  const cleanNeg    = sanitize(negocio, 200)
  const cleanMsg    = sanitize(mensaje, 1000)

  if (!cleanNombre || cleanNombre.length < 2) {
    return res.status(400).json({ error: 'Nombre requerido' })
  }
  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  // Honeypot — campo oculto que solo bots llenan
  if (req.body?.website) {
    return res.status(200).json({ ok: true }) // silenciar bots
  }

  // Enviar a Make.com / Zapier webhook (configura MAKE_WEBHOOK_URL en Vercel)
  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: cleanNombre,
          email:  cleanEmail,
          telefono: cleanTel,
          negocio: cleanNeg,
          mensaje: cleanMsg,
          fecha: new Date().toISOString(),
          fuente: 'cognitiamx.com',
        }),
      })
    } catch {
      // No bloquear la respuesta al usuario si el webhook falla
    }
  }

  return res.status(200).json({ ok: true })
}
