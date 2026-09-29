// Datos de contacto de Cognitia — fuente única.
// Cambiar aquí actualiza cabecera, pie, contacto, blog y chat a la vez.

/** Como se muestra al usuario. */
export const TELEFONO_DISPLAY = '+52 985 251 4602'

/** Para enlaces tel: — formato E.164. */
export const TELEFONO_E164 = '+529852514602'

/** Para wa.me — código de país + 10 dígitos, sin signos. */
export const WHATSAPP_NUMERO = '529852514602'

const SALUDO = 'Hola Irving, vengo de cognitiamx.com y quiero saber más'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(SALUDO)}`

/** Enlace de WhatsApp con un mensaje propio. */
export function whatsappCon(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
}

export const EMAIL = 'irvingsr@cognitiamx.com'
export const UBICACION = 'Playa del Carmen, Q. Roo'
