import { useEffect } from 'react';
import Logo from './Logo';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a7d3b] animate-fade-out">
      <div className="relative">
        <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-2xl animate-bounce-in">
          {/* Вставляем наш логотип */}
          <Logo className="w-16 h-16" />
        </div>
        <div className="absolute inset-0 w-24 h-24 bg-white rounded-[32px] opacity-20 animate-ping"></div>
      </div>

      <h1 className="text-white text-2xl font-bold mt-6 animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
        СБЕРБАНК
      </h1>
      <p className="text-white/70 text-sm mt-2 animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        Личный кабинет
      </p>
    </div>
  );
}