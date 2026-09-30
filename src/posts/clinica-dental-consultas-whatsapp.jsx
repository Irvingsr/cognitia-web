import { Link } from 'react-router-dom'

export default function PostClinicaDentalConsultasWhatsapp() {
  return (
    <article>
      <p>
        Una persona pregunta por WhatsApp si hay citas disponibles. Recepción responde, pero
        después no queda claro si la persona reservó, pidió otra fecha o dejó de contestar.
        Cuando eso ocurre varias veces, la clínica pierde de vista consultas que ya recibió.
      </p>
      <p>
        Para encontrar el problema no hace falta empezar con una herramienta nueva. Primero
        conviene revisar cómo pasa cada consulta del primer mensaje a una cita o a un siguiente
        contacto.
      </p>

      <h2>Revisa una semana de consultas</h2>
      <p>
        Elige una semana reciente y cuenta las consultas nuevas que llegaron por WhatsApp,
        teléfono, formulario y redes. Para cada una, registra solo lo necesario para entender
        el proceso:
      </p>
      <ul>
        <li>Cuándo llegó y por qué canal.</li>
        <li>Cuándo recibió la primera respuesta.</li>
        <li>Quién quedó a cargo.</li>
        <li>Qué servicio pidió y qué opciones se le ofrecieron.</li>
        <li>Si se agendó una cita o quedó una acción con fecha.</li>
        <li>Si la persona recibió seguimiento cuando no reservó.</li>
      </ul>
      <p>
        Puedes usar un identificador interno en lugar del nombre de la persona. Esta revisión
        no necesita información clínica ni detalles privados de pacientes.
      </p>

      <h2>Busca dónde se corta la conversación</h2>
      <p>
        No basta con saber cuántos mensajes llegaron. Mira en qué paso se detuvo cada consulta.
        Estas situaciones suelen señalar una tarea que conviene ordenar:
      </p>
      <ul>
        <li>
          <strong>La respuesta llega, pero nadie asume el siguiente paso.</strong> La persona
          pidió horarios y la conversación termina sin una propuesta concreta de cita.
        </li>
        <li>
          <strong>Una cita cancelada queda sin nueva fecha.</strong> El equipo registra la
          cancelación, pero no quién ofrecerá otra opción ni cuándo lo hará.
        </li>
        <li>
          <strong>La consulta cambia de canal.</strong> Comenzó por Instagram, siguió por
          WhatsApp y el equipo no sabe si ya recibió respuesta.
        </li>
        <li>
          <strong>El seguimiento depende de la memoria.</strong> Hay buena atención en cada
          conversación, pero no existe un registro común de lo que quedó pendiente.
        </li>
      </ul>

      <h2>Lo que se ofrece al agendar también cuenta</h2>
      <p>
        No todo se pierde por falta de respuesta. A veces la cita sí se agenda, pero no con la
        opción que más le convenía al paciente. Lo vi en una clínica dental que visité como
        cliente incógnito: recepción no sabía que estaba evaluando su proceso de atención.
      </p>
      <p>
        Al reservar por mensaje me ofrecieron una exploración y me dieron su precio. Ya en la
        clínica, pregunté cuánto costaba una limpieza. Resultó que la limpieza incluía la
        exploración y costaba poco más. Si me lo hubieran explicado al agendar, habría elegido
        la limpieza desde el principio: un servicio más completo por una diferencia pequeña, y
        sin pagar antes por una exploración que ya venía incluida.
      </p>
      <p>
        El problema no fue la recepcionista. Fue la falta de un protocolo claro para agendar.
        No se trata de ofrecer siempre lo más caro, sino de presentar la alternativa que más
        beneficia al paciente cuando la diferencia de precio es razonable. Eso mejora la
        experiencia del paciente y el ingreso de cada cita al mismo tiempo.
      </p>

      <h2>Decide el primer cambio con tus propios datos</h2>
      <p>
        Imagina que revisas 20 consultas y encuentras cuatro sin primera respuesta registrada
        y cinco que recibieron información, pero no tienen siguiente acción. Es un ejemplo
        hipotético. La decisión inicial sería confirmar quién responde, cómo se marca una
        conversación pendiente y en qué momento se vuelve a contactar a la persona. Si además
        notas que se agendan servicios sueltos cuando existía un paquete más conveniente, el
        ajuste puede ser una guía breve de qué opciones explicar según lo que pide el paciente.
      </p>
      <p>
        Después puedes medir si ese cambio se cumple. Cuenta las consultas nuevas, las que
        reciben respuesta, las citas agendadas y las que conservan una próxima acción. Compara
        una semana con la siguiente antes de sacar conclusiones. El volumen y el tipo de
        consultas pueden cambiar; por eso una cifra aislada dice poco.
      </p>

      <h2>Cuándo conviene automatizar</h2>
      <p>
        Si el equipo ya sabe quién atiende cada consulta y qué debe registrar, algunas tareas
        repetitivas pueden apoyarse con automatización: confirmar recepción de un mensaje,
        recordar una cita o avisar que hay una solicitud pendiente. Las respuestas sobre un
        caso particular y las decisiones de atención deben quedar bajo revisión humana.
      </p>
      <p>
        El <Link to="/diagnostico">Diagnóstico Estratégico de Cognitia</Link> empieza por
        observar el recorrido completo: dónde llegan las consultas, cuánto tarda la primera
        respuesta, qué se ofrece al agendar y qué ocurre hasta la cita. Con esa información se
        priorizan cambios por impacto esperado, esfuerzo y calidad de la evidencia. Así puedes
        decidir qué ajustar primero y qué herramienta, si alguna, merece la inversión.
      </p>
    </article>
  )
}
