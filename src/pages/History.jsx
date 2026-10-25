import { useState } from 'react';
import { transactions } from '../data';
import TransactionModal from '../components/TransactionModal';
import CategoryIcon from '../components/CategoryIcon'; // Импорт иконок

export default function History() {
  const [filter, setFilter] = useState('Все');
  const [selectedTx, setSelectedTx] = useState(null);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const formatDate = (dateString, timeString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    return timeString ? `${day}, ${timeString}` : day;
  };

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    return month.charAt(0).toUpperCase() + month.slice(1) + ' ' + date.getFullYear();
  };

  const filteredTransactions = filter === 'Все' 
    ? transactions 
    : transactions.filter(tx => 
        filter === 'Переводы' ? tx.category === 'Переводы' || tx.category === 'Пополнение' :
        filter === 'Покупки' ? ['Супермаркеты', 'Покупки', 'Кафе', 'Развлечения'].includes(tx.category) :
        tx.category === filter
      );

  const groupedTransactions = filteredTransactions.reduce((acc, tx) => {
    const month = getMonthName(tx.date);
    if (!acc[month]) acc[month] = [];
    acc[month].push(tx);
    return acc;
  }, {});

  const sortedMonths = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(groupedTransactions[b][0].date) - new Date(groupedTransactions[a][0].date);
  });

  return (
    <div className="min-h-screen pt-14 pb-24">
      {/* Шапка с фильтрами */}
      <div className="px-6 sticky top-0 z-10 bg-[#f2f4f7]/90 backdrop-blur-md pb-4 pt-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">История операций</h1>
        
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
          {['Все', 'Переводы', 'Перевод между счетами', 'Покупки', 'Супермаркеты'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-[#0a7d3b] text-white shadow-md' 
                  : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Список операций */}
      <div className="px-6 space-y-8">
        {sortedMonths.map(month => (
          <div key={month}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">{month}</h2>
            <div className="bg-white rounded-3xl p-4 shadow-sm space-y-4">
              {groupedTransactions[month].map((tx, index) => (
                <div 
                  key={tx.id} 
                  onClick={() => setSelectedTx(tx)}
                  className={`flex justify-between items-center cursor-pointer active:opacity-50 ${index !== groupedTransactions[month].length - 1 ? 'border-b border-gray-50 pb-4' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Иконка категории */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                      tx.amount > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tx.amount > 0 ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                        </svg>
                      ) : (
                        <CategoryIcon category={tx.category} className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{tx.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{tx.category} • {formatDate(tx.date, tx.time)}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-sm ${tx.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatMoney(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {sortedMonths.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            Нет операций по этому фильтру
          </div>
        )}
      </div>

      {/* Модалка деталей операции */}
      {selectedTx && (
        <TransactionModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
      )}
    </div>
  );
}