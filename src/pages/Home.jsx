import { useState, useEffect } from 'react';
import { userData, transactions } from '../data';
import CardModal from '../components/CardModal';
import PaymentsModal from '../components/PaymentsModal';
import StatsModal from '../components/StatsModal';

export default function Home({ onLogout, onNavigate, balance, cards }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  
  // Состояние для отслеживания скролла
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Доброй ночи,';
    if (hour < 12) return 'Доброе утро,';
    if (hour < 18) return 'Добрый день,';
    return 'Добрый вечер,';
  };

  return (
    <div className="min-h-screen bg-[#f2f4f7] pb-24">
      {/* Шапка (исчезает при скролле вниз) */}
      <header 
        className={`px-6 pt-14 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 transition-all duration-300 ${
          scrollY > 50 ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div>
          <p className="text-sm text-gray-500">{getGreeting()}</p>
          <h1 className="text-xl font-bold text-gray-800">{userData.name}</h1>
        </div>
        <button 
          onClick={onLogout} 
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </header>

      <main className="px-6 mt-4 space-y-6">
        {/* Общий баланс */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Общий баланс</p>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {formatMoney(balance)}
          </h2>
        </div>

        {/* Быстрые действия */}
        <div className="flex justify-between space-x-3">
          <button onClick={() => onNavigate('transfers')} className="flex-1 bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#0a7d3b]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Перевести</span>
          </button>
          
          <button 
            onClick={() => setIsPaymentsOpen(true)} 
            className="flex-1 bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Оплатить</span>
          </button>
        </div>

        {/* Карты (горизонтальный скролл) */}
        <div className="flex overflow-x-auto space-x-4 pb-4 snap-x hide-scrollbar -mx-6 px-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`flex-shrink-0 w-[300px] h-[180px] rounded-[24px] p-5 text-white bg-gradient-to-br ${card.gradient} shadow-lg snap-center flex flex-col justify-between relative overflow-hidden cursor-pointer active:scale-95 transition-transform`}
            >
              {/* Декоративные блики */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              {/* Верхний ряд: Название и Бесконтактная оплата */}
              <div className="flex justify-between items-start z-10">
                <p className="text-sm font-medium opacity-90">{card.type}</p>
                <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>

              {/* Чип и Номер карты */}
              <div className="z-10 mt-1">
                {/* Чип */}
                <div className="w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-[4px] mb-2 opacity-90 flex flex-col justify-center px-1">
                   <div className="h-[1px] w-full bg-yellow-700/30 mb-[2px]"></div>
                   <div className="h-[1px] w-full bg-yellow-700/30 mb-[2px]"></div>
                   <div className="h-[1px] w-full bg-yellow-700/30"></div>
                </div>
                <p className="text-lg tracking-widest font-mono opacity-90">{card.number}</p>
              </div>

              {/* Нижний ряд: Баланс, Срок действия и Логотип МИР */}
              <div className="flex justify-between items-end z-10">
                <div>
                  <p className="text-[10px] uppercase opacity-70 mb-0.5">Баланс</p>
                  <p className="text-xl font-bold">{formatMoney(card.balance)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[10px] uppercase opacity-70 mb-1">Срок действия</p>
                  <div className="flex space-x-3 items-center">
                    <p className="text-sm font-medium">{card.expiry}</p>
                    {/* Логотип МИР */}
                    <span className="text-lg font-bold italic tracking-tighter">МИР</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
{/* Блок расходов */}
        <div 
          onClick={() => setIsStatsOpen(true)}
          className="bg-white rounded-3xl p-5 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800">Расходы за месяц</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-extrabold text-gray-900">
              {formatMoney(transactions.filter(tx => tx.date.startsWith('2026-10') && tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0))}
            </p>
            <span className="text-sm text-gray-500">в октябре</span>
          </div>
        </div>
        {/* Последние операции */}
        <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Последние операции</h3>
            <button onClick={() => onNavigate('history')} className="text-sm text-[#0a7d3b] font-medium active:opacity-50">Все</button>
          </div>
          
          <div className="space-y-4">
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {tx.title[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{tx.title}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                  {tx.amount > 0 ? '+' : ''}{formatMoney(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Модальное окно карты */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}

      {/* Модальное окно оплаты услуг */}
      {isPaymentsOpen && (
        <PaymentsModal onClose={() => setIsPaymentsOpen(false)} />
      )}
      {/* Модальное окно статистики */}
      {isStatsOpen && (
        <StatsModal onClose={() => setIsStatsOpen(false)} />
      )}
    </div>
  );
}