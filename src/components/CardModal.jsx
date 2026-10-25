export default function CardModal({ card, onClose }) {
  if (!card) return null;

  const formatMoney = (amount) => {
    const safeAmount = amount || 0;
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(safeAmount);
  };

  const debt = (card.creditLimit || 0) - (card.balance || 0);
  const usagePercent = card.creditLimit ? (card.balance / card.creditLimit) * 100 : 0;

  return (
    <div 
      className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#f2f4f7] rounded-[32px] p-6 animate-scale-up flex flex-col shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{card.type}</h2>

        {card.id === 2 ? (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Задолженность</span>
                <span className="font-bold text-gray-800 text-lg">{formatMoney(debt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Мин. платеж</span>
                <span className="font-bold text-gray-800">{formatMoney(card.minPayment)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Дата платежа</span>
                <span className="font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">{card.paymentDate || '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Льготный период</span>
                <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{card.gracePeriod || '—'}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Кредитный лимит</span>
                <span className="font-medium text-gray-800">{formatMoney(card.creditLimit)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mt-1 overflow-hidden">
                <div className="bg-[#0a7d3b] h-3 rounded-full transition-all duration-500" style={{ width: `${usagePercent}%` }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Доступно</span>
              <span className="font-bold text-gray-800 text-lg">{formatMoney(card.balance)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Валюта счета</span>
              <span className="font-bold text-gray-800">Российский рубль (RUB)</span>
            </div>
          </div>
        )}

        <button onClick={onClose} className="w-full mt-6 bg-gray-200 text-gray-800 py-4 rounded-2xl font-semibold active:scale-95 transition-transform">
          Закрыть
        </button>
      </div>
    </div>
  );
}