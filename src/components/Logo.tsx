export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Universo Colecionável"
    >
      <defs>
        <radialGradient id="planetGradient" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#bdf3ff" />
          <stop offset="45%" stopColor="#4fc3e8" />
          <stop offset="100%" stopColor="#0a6ea8" />
        </radialGradient>
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <path id="topArc" d="M 70,245 A 165,165 0 0 1 330,245" fill="none" />
        <path id="bottomArc" d="M 70,255 A 165,165 0 0 0 330,255" fill="none" />
      </defs>

      <circle cx="200" cy="200" r="196" fill="#050505" />

      <ellipse
        cx="200"
        cy="200"
        rx="185"
        ry="78"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.5"
        strokeDasharray="2 8"
        transform="rotate(-18 200 200)"
      />

      <circle cx="200" cy="200" r="118" fill="url(#planetGradient)" />
      <ellipse
        cx="165"
        cy="160"
        rx="55"
        ry="30"
        fill="#ffffff"
        opacity="0.18"
        filter="url(#softBlur)"
      />
      <ellipse
        cx="245"
        cy="235"
        rx="45"
        ry="24"
        fill="#063b5c"
        opacity="0.25"
        filter="url(#softBlur)"
      />

      <g fill="#ffffff">
        <path d="M 328 118 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 z" />
        <path d="M 95 265 l2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5 z" opacity="0.9" />
        <circle cx="300" cy="150" r="2.5" />
        <circle cx="113" cy="300" r="2" opacity="0.8" />
      </g>

      <g opacity="0.9">
        <circle cx="296" cy="108" r="5" fill="#ffffff" />
        <circle cx="286" cy="118" r="2.6" fill="#ffffff" opacity="0.7" />
        <circle cx="278" cy="127" r="1.8" fill="#ffffff" opacity="0.5" />
        <circle cx="271" cy="135" r="1.2" fill="#ffffff" opacity="0.3" />
      </g>

      <g transform="translate(200 206)">
        <path
          d="M -92 18
             C -92 6 -80 2 -66 0
             L -46 -10
             C -34 -22 -16 -28 2 -28
             C 20 -28 34 -22 44 -12
             L 70 -10
             C 84 -8 92 -2 92 10
             L 92 18
             C 92 24 86 28 78 28
             L -78 28
             C -86 28 -92 24 -92 18 Z"
          fill="#0b0b0c"
        />
        <path
          d="M -40 -9 L -24 -21 C -16 -26 -4 -29 6 -29 C 16 -29 26 -25 33 -17 L 44 -9 Z"
          fill="#0b0b0c"
        />
        <circle cx="-54" cy="28" r="17" fill="#0b0b0c" />
        <circle cx="-54" cy="28" r="7" fill="#4fc3e8" />
        <circle cx="52" cy="28" r="17" fill="#0b0b0c" />
        <circle cx="52" cy="28" r="7" fill="#4fc3e8" />
      </g>

      <text
        fontSize="40"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="4"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          UNIVERSO
        </textPath>
      </text>

      <text
        fontSize="34"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="2"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          COLECIONÁVEL
        </textPath>
      </text>
    </svg>
  );
}
