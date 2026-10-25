import { useState } from 'react';
import MobilePayment from './MobilePayment';
import FinesScreen from './FinesScreen';
import UtilityScreen from './UtilityScreen';
import EducationScreen from './EducationScreen';
import InternetScreen from './InternetScreen';
import GamesScreen from './GamesScreen'; // Импортируем экран игр

export default function PaymentsModal({ onClose }) {
  const [activeScreen, setActiveScreen] = useState('menu'); 

  const services = [
    { id: 1, title: 'Мобильная связь', icon: '📱', color: 'bg-blue-50 text-blue-500' },
    { id: 2, title: 'ЖКХ', icon: '🏠', color: 'bg-orange-50 text-orange-500' },
    { id: 3, title: 'Интернет и ТВ', icon: '🌐', color: 'bg-purple-50 text-purple-500' },
    { id: 4, title: 'Штрафы ГИБДД', icon: '🚓', color: 'bg-red-50 text-red-500' },
    { id: 5, title: 'Образование', icon: '🎓', color: 'bg-yellow-50 text-yellow-600' },
    { id: 6, title: 'Игры и сервисы', icon: '🎮', color: 'bg-indigo-50 text-indigo-500' },
  ];

  return (
    <div 
      className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#f2f4f7] rounded-[32px] p-6 animate-scale-up flex flex-col shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        {activeScreen === 'menu' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Оплата услуг</h2>
              <button onClick={onClose} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {services.map(service => (
                <button 
                  key={service.id}
                  className="bg-white p-3 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 active:scale-95 transition-transform"
                  onClick={() => {
                    if (service.title === 'Мобильная связь') setActiveScreen('mobile');
                    else if (service.title === 'Штрафы ГИБДД') setActiveScreen('fines');
                    else if (service.title === 'ЖКХ') setActiveScreen('utility');
                    else if (service.title === 'Образование') setActiveScreen('education');
                    else if (service.title === 'Интернет и ТВ') setActiveScreen('internet');
                    else if (service.title === 'Игры и сервисы') setActiveScreen('games'); // Обработка
                    else alert(`Оплата: ${service.title}`);
                  }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${service.color}`}>
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 text-center leading-tight break-words">{service.title}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-800 py-4 rounded-2xl font-semibold active:scale-95 transition-transform"
            >
              Закрыть
            </button>
          </>
        )}

        {activeScreen === 'mobile' && (
          <MobilePayment onBack={() => setActiveScreen('menu')} />
        )}

        {activeScreen === 'fines' && (
          <FinesScreen onBack={() => setActiveScreen('menu')} />
        )}

        {activeScreen === 'utility' && (
          <UtilityScreen onBack={() => setActiveScreen('menu')} />
        )}

        {activeScreen === 'education' && (
          <EducationScreen onBack={() => setActiveScreen('menu')} />
        )}

        {activeScreen === 'internet' && (
          <InternetScreen onBack={() => setActiveScreen('menu')} />
        )}

        {activeScreen === 'games' && (
          <GamesScreen onBack={() => setActiveScreen('menu')} />
        )}
      </div>
    </div>
  );
}