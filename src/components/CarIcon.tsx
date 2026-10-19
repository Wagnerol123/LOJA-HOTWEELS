interface CarIconProps {
  color: string;
  accent: string;
  className?: string;
}

export default function CarIcon({ color, accent, className }: CarIconProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      role="img"
      aria-label="Ilustração de carrinho de brinquedo"
    >
      <ellipse cx="60" cy="50" rx="52" ry="4" fill="#000000" opacity="0.12" />
      <path
        d="M14 38 L20 22 Q26 14 40 14 L78 14 Q90 14 96 24 L104 38 Z"
        fill={color}
      />
      <path
        d="M30 30 L36 18 Q39 14 46 14 L70 14 Q76 14 80 19 L86 30 Z"
        fill={accent}
        opacity="0.85"
      />
      <rect x="10" y="34" width="100" height="8" rx="4" fill={color} />
      <circle cx="34" cy="44" r="10" fill="#1c1c1c" />
      <circle cx="34" cy="44" r="4" fill="#9e9e9e" />
      <circle cx="86" cy="44" r="10" fill="#1c1c1c" />
      <circle cx="86" cy="44" r="4" fill="#9e9e9e" />
    </svg>
  );
}
