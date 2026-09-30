import { EMAIL } from '../data/contacto'

// Aviso de Privacidad Integral (Ley Federal de Protección de Datos Personales en
// Posesión de los Particulares, DOF 20-mar-2025). Si cambia qué datos recoge el sitio
// (formularios, chat) o a qué servicios se envían (api/*.js), actualizar este texto y
// la fecha de ACTUALIZADO.
const RESPONSABLE = 'Irving de los Santos Reyes'
const DOMICILIO =
  'Cerrada de Andalucía, Colonia La Toscana, C.P. 77725, Playa del Carmen, municipio de Solidaridad, Quintana Roo, México'
const ACTUALIZADO = '29 de septiembre de 2026'

export default function Privacidad() {
  const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>

  return (
    <>
      <section className="t-sec t-sec-first" style={{ paddingBottom: 0 }}>
        <div className="t-wrap" style={{ maxWidth: 780 }}>
          <p className="t-eyebrow">Legal</p>
          <h1>Aviso de Privacidad</h1>
          <p className="t-lead" style={{ maxWidth: 'none' }}>
            Cómo tratamos los datos personales que compartes con Cognitia a través de este sitio.
          </p>
          <div className="t-post-meta">
            <span>Última actualización: {ACTUALIZADO}</span>
          </div>
        </div>
      </section>

      <section className="t-sec">
        <div className="t-wrap" style={{ maxWidth: 780 }}>
          <div className="t-post-content">
            <h2>1. Responsable de tus datos</h2>
            <p>
              <strong>{RESPONSABLE}</strong>, quien opera comercialmente como Cognitia
              (EstrategIA Consulting), con domicilio en {DOMICILIO}, es responsable del
              tratamiento de tus datos personales. Para cualquier asunto relacionado con este
              aviso puedes escribir a {mail}.
            </p>

            <h2>2. Datos personales que recabamos</h2>
            <p>Solo pedimos los datos necesarios para atenderte:</p>
            <ul>
              <li>
                <strong>Formulario de contacto:</strong> nombre, correo electrónico, teléfono
                (opcional), nombre de tu negocio (opcional) y el mensaje que nos escribes.
              </li>
              <li>
                <strong>Asistente de chat del sitio:</strong> nombre, número de WhatsApp,
                correo electrónico (opcional) y el contenido de la conversación.
              </li>
              <li>
                <strong>WhatsApp, correo o llamada:</strong> los datos que tú decidas
                compartir al comunicarte directamente con nosotros.
              </li>
            </ul>
            <p>
              No solicitamos datos personales sensibles (por ejemplo, de salud, creencias o
              datos financieros). Te pedimos no incluirlos en tus mensajes ni en el chat. La
              evaluación gratuita y la calculadora del sitio funcionan en tu navegador y no
              envían ni guardan tus respuestas.
            </p>

            <h2>3. Para qué usamos tus datos</h2>
            <p>Finalidades necesarias para atender tu solicitud:</p>
            <ul>
              <li>Responder tus mensajes y dudas sobre nuestros servicios.</li>
              <li>Contactarte por WhatsApp, correo o teléfono para dar seguimiento.</li>
              <li>Agendar llamadas, diagnósticos o sesiones de trabajo.</li>
              <li>Preparar propuestas y, si nos contratas, prestar el servicio acordado.</li>
            </ul>
            <p>Finalidad adicional, que no es necesaria para atenderte:</p>
            <ul>
              <li>Enviarte información sobre talleres, contenido y servicios de Cognitia.</li>
            </ul>
            <p>
              Si no quieres que usemos tus datos para esta finalidad adicional, escríbenos a{' '}
              {mail} con el asunto “No enviar información”. Negarte no afecta la atención de
              tu solicitud.
            </p>

            <h2>4. Con quién se comparten</h2>
            <p>
              Para operar el sitio y responderte usamos proveedores que tratan tus datos
              únicamente por nuestra cuenta y siguiendo nuestras instrucciones:
            </p>
            <ul>
              <li><strong>Vercel:</strong> alojamiento del sitio web.</li>
              <li>
                <strong>Make.com:</strong> recibe los datos del formulario y del chat para
                hacérnoslos llegar.
              </li>
              <li>
                <strong>Anthropic:</strong> procesa las conversaciones del asistente de chat
                para generar sus respuestas y un resumen para nuestro seguimiento.
              </li>
              <li><strong>Calendly:</strong> agenda de llamadas, si decides reservar una.</li>
              <li>
                <strong>WhatsApp (Meta) y nuestro proveedor de correo electrónico:</strong>{' '}
                para comunicarnos contigo.
              </li>
            </ul>
            <p>
              Algunos de estos proveedores pueden almacenar la información fuera de México. No
              vendemos ni cedemos tus datos personales a terceros. Solo los compartiríamos sin
              tu consentimiento en los casos que permite la ley, como un requerimiento de una
              autoridad competente.
            </p>

            <h2>5. Tus derechos ARCO y cómo ejercerlos</h2>
            <p>
              Tienes derecho a <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>{' '}
              si son inexactos, <strong>cancelarlos</strong> cuando ya no sean necesarios y{' '}
              <strong>oponerte</strong> a su uso para fines específicos (derechos ARCO).
            </p>
            <p>Para ejercerlos, envía un correo a {mail} que incluya:</p>
            <ul>
              <li>Tu nombre y un medio para responderte.</li>
              <li>Un documento que acredite tu identidad o, en su caso, la de tu representante.</li>
              <li>Qué derecho quieres ejercer y sobre qué datos.</li>
              <li>Cualquier información que nos ayude a localizar tus datos.</li>
            </ul>
            <p>
              Te responderemos en un plazo máximo de 20 días hábiles. Si la solicitud procede,
              la haremos efectiva dentro de los 15 días hábiles siguientes a la respuesta.
            </p>

            <h2>6. Revocar tu consentimiento o limitar el uso</h2>
            <p>
              Puedes revocar tu consentimiento o pedirnos que limitemos el uso de tus datos en
              cualquier momento, escribiendo a {mail}. Ten en cuenta que, si la revocación
              afecta una finalidad necesaria, es posible que ya no podamos atender tu
              solicitud o continuar el servicio.
            </p>

            <h2>7. Cookies y tecnologías de rastreo</h2>
            <p>
              Este sitio no utiliza cookies de publicidad ni herramientas de analítica que te
              identifiquen. Si en el futuro lo hacemos, lo informaremos aquí.
            </p>

            <h2>8. Cambios a este aviso</h2>
            <p>
              Podemos actualizar este aviso por cambios legales o en la forma en que
              trabajamos. Publicaremos cualquier cambio en esta misma página, con su fecha de
              actualización.
            </p>

            <h2>9. Autoridad</h2>
            <p>
              Si consideras que tu derecho a la protección de datos personales ha sido
              vulnerado, puedes acudir a la autoridad competente en la materia, la Secretaría
              Anticorrupción y Buen Gobierno.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
