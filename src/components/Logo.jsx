export default function Logo({ className = "w-12 h-12" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Белый фон */}
      <rect width="100" height="100" rx="20" fill="white" />
      
      {/* Градиент для полосок */}
      <defs>
        <linearGradient id="sberGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A321" />
          <stop offset="100%" stopColor="#FFF200" />
        </linearGradient>
      </defs>

      {/* Верхняя горизонтальная полоска */}
      <rect 
        x="40" y="25" width="38" height="14" rx="3" 
        fill="url(#sberGradient)" 
      />
      
      {/* Нижняя горизонтальная полоска */}
      <rect 
        x="40" y="61" width="38" height="14" rx="3" 
        fill="url(#sberGradient)" 
      />
      
      {/* 
        Левая вертикальная полоска с более круглой левой стороной.
        Мы используем path, чтобы сделать левые углы радиусом 8 (почти полукруг), 
        а правые — 3, чтобы они были аккуратными.
      */}
      <path 
        d="M 38 28 
           A 3 3 0 0 0 35 25 
           L 30 25 
           A 8 8 0 0 0 22 33 
           L 22 67 
           A 8 8 0 0 0 30 75 
           L 35 75 
           A 3 3 0 0 0 38 72 
           Z" 
        fill="url(#sberGradient)" 
      />
    </svg>
  );
}