/**
 * Marca COGNITIA.
 *
 * Reproduce el logotipo tal como está definido en el Brand Guide oficial
 * (Canva · "Cognitia Brand Guide Final PDF", pág. 02 "Logotipo" y pág. 04
 * "Colores primarios") y en `01_Identidad_y_Estrategia/Identidad_Visual/
 * cognitia_logo_Oficial.html`.
 *
 * Especificación oficial respetada aquí:
 *   · Isotipo: cuadrado de esquinas muy redondeadas (radio ≈ 26% del lado),
 *     degradado 135° #7B5CF5 → #5B8DEF, letra "C" blanca en DM Sans Bold.
 *   · Wordmark: "COGNIT" en blanco + "IA" con degradado #00C2FF → #0088FF.
 *   · Regla del Brand Guide: la palabra COGNITIA nunca se parte en dos líneas.
 *
 * NOTA: en la carpeta de identidad no existe un SVG ni un PNG del logotipo;
 * el único archivo "oficial" era una maqueta HTML/CSS. Esto es la traducción
 * fiel de esa especificación a un activo vectorial usable en web. Si aparece
 * el vector original, sustituir este componente por él.
 */

/** Isotipo: la "C" en su contenedor. Uso reducido, favicon, avatar. */
export function LogoMark({ size = 34, id = 'cognitia-mark' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Cognitia"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7B5CF5" />
          <stop offset="1" stopColor="#5B8DEF" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill={`url(#${id}-g)`} />
      <text
        x="32"
        y="33"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="36"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        C
      </text>
    </svg>
  )
}

/**
 * Lockup horizontal: isotipo + wordmark. Es la variante para cabecera y pie.
 * `showMark={false}` deja solo el wordmark (variante principal sobre fondo oscuro).
 */
export default function Logo({ size = 30, showMark = true, id = 'cognitia-logo' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      {showMark && <LogoMark size={size} id={id} />}
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: size * 0.78,
          letterSpacing: 1.6,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          color: '#FFFFFF',
        }}
      >
        COGNIT
        <span
          style={{
            background: 'linear-gradient(90deg, #00C2FF, #0088FF)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: '#00C2FF',
          }}
        >
          IA
        </span>
      </span>
    </span>
  )
}
