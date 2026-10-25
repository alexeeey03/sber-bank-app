import { useEffect } from 'react';

export default function FaceID({ onSuccess }) {
  useEffect(() => {
    // Через 2 секунды имитируем успешный вход
    const timer = setTimeout(() => {
      onSuccess();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Анимированная иконка лица */}
      <div className="relative mb-12">
        {/* Пульсирующие круги */}
        <div className="absolute inset-0 bg-[#0a7d3b] rounded-3xl blur-2xl opacity-20 animate-ping"></div>
        
        <div className="w-32 h-32 bg-[#1c1c1e] rounded-[30px] flex items-center justify-center border border-gray-700 relative z-10 overflow-hidden">
          {/* Эффект сканирования */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#0a7d3b] shadow-[0_0_10px_#0a7d3b] animate-[scan_2s_ease-in-out_infinite]"></div>
          
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </div>

      <h1 className="text-white text-2xl font-bold mb-2">Face ID</h1>
      <p className="text-gray-400">Сканирование лица...</p>

      {/* Анимация линии сканера (добавим в CSS) */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 10%; opacity: 0; }
          50% { top: 90%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}