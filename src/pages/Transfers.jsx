import { useState } from 'react';

export default function Transfers({ onTransfer, onInternalTransfer, cards }) {
  const [mode, setMode] = useState('external'); // 'external' или 'internal'
  
  // Состояния для внешнего перевода
  const [amount, setAmount] = useState('');
  const [fromCardId, setFromCardId] = useState(cards[0]?.id);
  const [toPhone, setToPhone] = useState('');
  
  // Состояния для внутреннего перевода
  const [toCardId, setToCardId] = useState(cards[1]?.id);
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const numAmount = Number(amount);
    
    if (!amount || numAmount <= 0) return;

    // Ищем карту списания
    const fromCard = cards.find(c => c.id === Number(fromCardId));

    // Проверка на отрицательный баланс
    if (fromCard.balance < numAmount) {
      setError('Недостаточно средств на выбранной карте');
      return;
    }

    // Выполняем перевод
    if (mode === 'external') {
      onTransfer(Number(fromCardId), numAmount);
    } else {
      if (fromCardId === toCardId) {
        setError('Выберите разные карты для перевода');
        return;
      }
      onInternalTransfer(Number(fromCardId), Number(toCardId), numAmount);
    }

    // Показываем успех
    setIsSuccess(true);
    setAmount('');
    setToPhone('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-6 pt-14 min-h-screen relative">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Переводы</h1>

      {/* Переключатель режимов */}
      <div className="flex bg-gray-200/50 p-1 rounded-2xl mb-6">
        <button 
          onClick={() => { setMode('external'); setError(''); }}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'external' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
        >
          По номеру телефона
        </button>
        <button 
          onClick={() => { setMode('internal'); setError(''); }}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'internal' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
        >
          Между картами
        </button>
      </div>

      {/* Уведомление об успехе */}
      {isSuccess && (
        <div className="absolute top-20 left-6 right-6 bg-green-500 text-white p-4 rounded-2xl shadow-lg flex items-center space-x-3 animate-pulse z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span className="font-medium">Перевод успешно выполнен!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm">
        
        {/* Карта списания */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">Списать с карты</label>
          <div className="space-y-2">
            {cards.map(card => (
              <label 
                key={card.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  Number(fromCardId) === card.id ? 'border-[#0a7d3b] bg-green-50/50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="fromCard" 
                    value={card.id}
                    checked={Number(fromCardId) === card.id}
                    onChange={() => setFromCardId(card.id)}
                    className="w-5 h-5 text-[#0a7d3b] focus:ring-[#0a7d3b]"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{card.type}</p>
                    <p className="text-xs text-gray-500">{card.number}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800">{formatMoney(card.balance)}</p>
              </label>
            ))}
          </div>
        </div>

        {/* Поле ввода: Телефон ИЛИ Карта получателя */}
        {mode === 'external' ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-2">Номер телефона получателя</label>
            <input
              type="tel"
              placeholder="+7 (999) 000-00-00"
              value={toPhone}
              onChange={(e) => setToPhone(e.target.value)}
              required
              className="w-full bg-gray-50 px-4 py-4 rounded-2xl text-lg text-gray-800 border-none focus:ring-2 focus:ring-[#0a7d3b] transition-all"
            />
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-2">Зачислить на карту</label>
            <div className="space-y-2">
              {cards.filter(c => c.id !== Number(fromCardId)).map(card => (
                <label 
                  key={card.id} 
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    Number(toCardId) === card.id ? 'border-[#0a7d3b] bg-green-50/50' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="toCard" 
                      value={card.id}
                      checked={Number(toCardId) === card.id}
                      onChange={() => setToCardId(card.id)}
                      className="w-5 h-5 text-[#0a7d3b] focus:ring-[#0a7d3b]"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{card.type}</p>
                      <p className="text-xs text-gray-500">{card.number}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Ввод суммы */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">Сумма перевода (₽)</label>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setError(''); }}
            className={`w-full bg-gray-50 px-4 py-4 rounded-2xl text-2xl font-bold text-gray-800 border-none focus:ring-2 transition-all ${
              error ? 'ring-2 ring-red-500' : 'focus:ring-[#0a7d3b]'
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={!amount || Number(amount) <= 0}
          className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl text-lg font-semibold active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
        >
          {mode === 'external' ? 'Перевести' : 'Перевести между картами'}
        </button>
      </form>
    </div>
  );
}
