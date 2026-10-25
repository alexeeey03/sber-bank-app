import { openReceipt } from './CheckGenerator';

export default function TransactionModal({ tx, onClose }) {
  if (!tx) return null;

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const formatFullDate = (dateString, timeString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    return timeString ? `${formattedDate}, ${timeString}` : formattedDate;
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#f2f4f7] rounded-[32px] p-6 animate-scale-up flex flex-col items-center shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 ${
          tx.amount > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
        }`}>
          {tx.amount > 0 ? '+' : tx.title[0]}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">{tx.title}</h2>
        <p className="text-3xl font-extrabold text-gray-900 mb-2">
          {tx.amount > 0 ? '+' : ''}{formatMoney(tx.amount)}
        </p>
        <p className="text-sm text-gray-500 mb-6 text-center">{formatFullDate(tx.date, tx.time)} • {tx.category}</p>

        <div className="w-full bg-white rounded-3xl p-5 shadow-sm space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Статус</span>
            <span className="font-medium text-green-600">Выполнено</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Категория</span>
            <span className="font-medium text-gray-800">{tx.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Счет списания</span>
            <span className="font-medium text-gray-800">Дебетовая карта •• 4521</span>
          </div>
        </div>

        <button 
          onClick={() => openReceipt(tx)}
          className="w-full bg-white text-gray-800 py-4 rounded-2xl font-semibold shadow-sm active:scale-95 transition-transform flex items-center justify-center space-x-2 mb-3"
        >
          <svg className="w-5 h-5 text-[#0a7d3b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Скачать чек PDF</span>
        </button>

        <button onClick={onClose} className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl font-semibold active:scale-95 transition-transform">
          Закрыть
        </button>
      </div>
    </div>
  );
}