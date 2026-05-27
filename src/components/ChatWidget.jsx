import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `Eres el asistente virtual de COGNITIA, agencia especializada en Agentes de IA como Servicio (AaaS). Respondes siempre en español, con tono directo y cálido — como un asesor de confianza, no como un vendedor.

Tu función principal:
- Explicar qué son los agentes de IA y cómo transforman operaciones reales de negocio
- Describir los servicios de COGNITIA: Agente de Ventas (calificación de leads, agenda citas), Agente de Atención al Cliente (WhatsApp/email 24/7), Agente de RH (filtrado de candidatos), Agente Contable (reportes y organización de gastos)
- Identificar los procesos repetitivos del negocio del usuario y mostrar cómo un agente los resuelve
- Orientar al usuario al Test de Diagnóstico gratuito (/diagnostico) o al contacto directo (/contacto)

Reglas:
- Máximo 3-4 oraciones por respuesta. Sé conciso.
- Habla de RESULTADOS y TRANSFORMACIONES, no de tecnología
- No menciones precios específicos ni hagas compromisos de precio
- No menciones "ChatGPT" ni digas que eres Claude o que perteneces a Anthropic
- Si el usuario muestra interés en contratar, invítale a hacer el Test de Diagnóstico gratuito
- Si pregunta por contacto: WhatsApp +52 984 179 8638 o la página /contacto`

const WELCOME_MSG = {
  role: 'assistant',
  content: '¡Hola! Soy el asistente de Cognitia. ¿En qué puedo ayudarte? Cuéntame sobre tu negocio y te explico cómo un agente de IA puede transformarlo. 🚀',
}

const s = {
  /* FAB */
  fab: {
    position: 'fixed',
    bottom: 28,
    right: 28,
    width: 56,
    height: 56,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(123,92,245,0.45)',
    transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
  },
  fabIcon: {
    fontSize: 24,
    color: '#fff',
    transition: 'transform 0.3s',
    fontWeight: 700,
    lineHeight: 1,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#00DB82',
    border: '2px solid #060C18',
    animation: 'pulseBadge 1.5s ease-in-out infinite',
  },

  /* Panel */
  panel: {
    position: 'fixed',
    bottom: 96,
    right: 28,
    width: 'min(380px, calc(100vw - 32px))',
    maxHeight: 'min(560px, calc(100vh - 120px))',
    background: 'rgba(11,17,33,0.97)',
    border: '1px solid rgba(123,92,245,0.25)',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 199,
    boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,194,255,0.08)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    backdropFilter: 'blur(20px)',
  },

  /* Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, rgba(123,92,245,0.15), rgba(0,194,255,0.08))',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7B5CF5, #00C2FF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 700,
    flexShrink: 0,
  },
  agentName: {
    fontSize: 14,
    fontWeight: 700,
    color: '#E8F0FE',
    letterSpacing: 0.3,
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#00DB82',
    flexShrink: 0,
    boxShadow: '0 0 6px #00DB82',
  },
  statusText: {
    fontSize: 11,
    color: '#7A8FAD',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#7A8FAD',
    cursor: 'pointer',
    fontSize: 16,
    padding: '4px 8px',
    borderRadius: 6,
    transition: 'color 0.2s',
  },

  /* Messages */
  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 16px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(123,92,245,0.3) transparent',
  },
  msgRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 8,
    animation: 'fadeSlideIn 0.25s ease',
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7B5CF5, #5B8DEF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: '#fff',
    flexShrink: 0,
    marginBottom: 2,
  },
  msgBot: {
    maxWidth: '78%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px 16px 16px 4px',
    padding: '10px 14px',
    fontSize: 13.5,
    lineHeight: 1.55,
    color: '#D8E6FF',
  },
  msgUser: {
    maxWidth: '78%',
    background: 'linear-gradient(135deg, rgba(123,92,245,0.3), rgba(91,141,239,0.3))',
    border: '1px solid rgba(123,92,245,0.25)',
    borderRadius: '16px 16px 4px 16px',
    padding: '10px 14px',
    fontSize: 13.5,
    lineHeight: 1.55,
    color: '#E8F0FE',
  },
  typing: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '12px 14px',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#00C2FF',
    display: 'inline-block',
    animation: 'dotBounce 1.2s ease-in-out infinite',
  },
  errorMsg: {
    fontSize: 12,
    color: '#ff6b6b',
    background: 'rgba(255,100,100,0.08)',
    border: '1px solid rgba(255,100,100,0.2)',
    borderRadius: 10,
    padding: '8px 12px',
    textAlign: 'center',
  },

  /* Input area */
  inputRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 8,
    padding: '12px 16px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(6,12,24,0.6)',
    flexShrink: 0,
  },
  textarea: {
    flex: 1,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: '#E8F0FE',
    fontSize: 13.5,
    padding: '10px 14px',
    resize: 'none',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1.45,
    minHeight: 40,
    maxHeight: 100,
    overflowY: 'auto',
    transition: 'border-color 0.2s',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #7B5CF5, #00C2FF)',
    border: 'none',
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'opacity 0.2s',
    boxShadow: '0 4px 12px rgba(123,92,245,0.4)',
  },

  /* Footer */
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#3D5170',
    padding: '8px 16px 10px',
    borderTop: '1px solid rgba(255,255,255,0.04)',
    flexShrink: 0,
  },
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unread, setUnread] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  // Inicializar con mensaje de bienvenida al abrir por primera vez
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([WELCOME_MSG])
    }
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Mostrar badge de notificación después de 8s si no está abierto
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setUnread(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: newMessages.slice(-12).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar tu mensaje')
      }

      const reply = data.content?.[0]?.text || 'No pude procesar tu mensaje. Intenta de nuevo.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setError(e.message || 'Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function handleTextareaInput(e) {
    setInput(e.target.value)
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
  }

  return (
    <>
      {/* Panel del chat */}
      <div
        ref={panelRef}
        style={{
          ...s.panel,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div style={s.header}>
          <div style={s.headerLeft}>
            <div style={s.avatar}>◈</div>
            <div>
              <div style={s.agentName}>Asistente Cognitia</div>
              <div style={s.statusRow}>
                <span style={s.statusDot} />
                <span style={s.statusText}>En línea · IA activa 24/7</span>
              </div>
            </div>
          </div>
          <button style={s.closeBtn} onClick={() => setOpen(false)} aria-label="Cerrar chat">
            ✕
          </button>
        </div>

        {/* Mensajes */}
        <div style={s.messagesArea}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...s.msgRow,
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {m.role === 'assistant' && <div style={s.botAvatar}>◈</div>}
              <div style={m.role === 'user' ? s.msgUser : s.msgBot}>
                {m.content}
              </div>
            </div>
          ))}

          {/* Indicador de "escribiendo..." */}
          {loading && (
            <div style={{ ...s.msgRow, justifyContent: 'flex-start' }}>
              <div style={s.botAvatar}>◈</div>
              <div style={{ ...s.msgBot, ...s.typing }}>
                <span style={s.dot} />
                <span style={{ ...s.dot, animationDelay: '0.2s' }} />
                <span style={{ ...s.dot, animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          {error && <div style={s.errorMsg}>{error}</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de input */}
        <div style={s.inputRow}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKey}
            placeholder="Escribe tu pregunta..."
            style={s.textarea}
            rows={1}
            maxLength={500}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{
              ...s.sendBtn,
              opacity: !input.trim() || loading ? 0.4 : 1,
              cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
            }}
            aria-label="Enviar mensaje"
          >
            ↑
          </button>
        </div>

        {/* Footer */}
        <div style={s.footer}>
          Powered by <span style={{ color: '#00C2FF' }}>Cognitia</span> · IA que trabaja 24/7
        </div>
      </div>

      {/* Botón flotante (FAB) */}
      <button
        style={{
          ...s.fab,
          background: open
            ? 'linear-gradient(135deg, #444, #222)'
            : 'linear-gradient(135deg, #7B5CF5, #00C2FF)',
        }}
        onClick={() => { setOpen(o => !o); setUnread(false) }}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente IA de Cognitia'}
      >
        <span style={{ ...s.fabIcon, transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          {open ? '✕' : '◈'}
        </span>
        {/* Badge de notificación */}
        {unread && !open && <span style={s.badge} />}
      </button>
    </>
  )
}
