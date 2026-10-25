import { useState } from 'react';
import { transactions } from '../data';
import CategoryIcon from './CategoryIcon';

export default function StatsModal({ onClose }) {
  const [type, setType] = useState('expenses'); // 'expenses' или 'income'

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount);
  };

  // Фильтруем операции за текущий месяц (Октябрь 2026)
  const currentMonthTxs = transactions.filter(tx => tx.date.startsWith('2026-10'));
  
  // Разделяем на доходы и расходы
  const expenses = currentMonthTxs.filter(tx => tx.amount < 0);
  const incomes = currentMonthTxs.filter(tx => tx.amount > 0);

  const activeTxs = type === 'expenses' ? expenses : incomes;
  const totalAmount = activeTxs.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // Группируем по категориям
  const groupedData = activeTxs.reduce((acc, tx) => {
    const cat = tx.category;
    if (!acc[cat]) acc[cat] = 0;
    acc[cat] += Math.abs(tx.amount);
    return acc;
  }, {});

  // Сортируем категории по убыванию суммы
  const sortedCategories = Object.keys(groupedData).sort((a, b) => groupedData[b] - groupedData[a]);

  // Цвета для диаграммы
  const colors = ['#0a7d3b', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

  // Функция для рисования SVG круговой диаграммы
  let cumulativePercent = 0;
  const pieSlices = sortedCategories.map((cat, index) => {
    const percent = groupedData[cat] / totalAmount;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    
    // Вычисляем координаты для дуги
    const x1 = Math.cos(2 * Math.PI * startPercent);
    const y1 = Math.sin(2 * Math.PI * startPercent);
    const x2 = Math.cos(2 * Math.PI * cumulativePercent);
    const y2 = Math.sin(2 * Math.PI * cumulativePercent);
    
    const largeArcFlag = percent > 0.5 ? 1 : 0;
    
    return {
      path: `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      color: colors[index % colors.length],
      category: cat,
      amount: groupedData[cat],
      percent: Math.round(percent * 100)
    };
  });

  return (
    <div 
      className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#f2f4f7] rounded-[32px] p-6 animate-scale-up flex flex-col shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Аналитика</h2>
          <button onClick={onClose} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
            ✕
          </button>
        </div>

        {/* Переключатель Расходы / Доходы */}
        <div className="flex bg-gray-200/50 p-1 rounded-2xl mb-6">
          <button 
            onClick={() => setType('expenses')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${type === 'expenses' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'}`}
          >
            Расходы
          </button>
          <button 
            onClick={() => setType('income')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${type === 'income' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}
          >
            Доходы
          </button>
        </div>

        {/* Общая сумма */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-1">
            {type === 'expenses' ? 'Всего потрачено за месяц' : 'Всего получено за месяц'}
          </p>
          <h3 className={`text-3xl font-extrabold ${type === 'expenses' ? 'text-red-500' : 'text-[#0a7d3b]'}`}>
            {formatMoney(totalAmount)}
          </h3>
        </div>

        {/* Круговая диаграмма */}
        {totalAmount > 0 ? (
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <svg viewBox="-1 -1 2 2" className="w-full h-full -rotate-90">
                {pieSlices.map((slice, i) => (
                  <path key={i} d={slice.path} fill={slice.color} />
                ))}
                {/* Вырезаем центр, чтобы получилось кольцо */}
                <circle cx="0" cy="0" r="0.6" fill="#f2f4f7" />
              </svg>
            </div>

            {/* Легенда */}
            <div className="w-full space-y-3 mb-6">
              {pieSlices.map((slice, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }}></div>
                    <span className="text-gray-700">{slice.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-800">{formatMoney(slice.amount)}</span>
                    <span className="text-xs text-gray-400 ml-2">({slice.percent}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Нет данных за этот месяц
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full mt-4 bg-gray-200 text-gray-800 py-4 rounded-2xl font-semibold active:scale-95 transition-transform"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}