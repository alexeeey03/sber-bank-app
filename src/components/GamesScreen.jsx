import { useState } from 'react';

export default function GamesScreen({ onBack }) {
  const [platform, setPlatform] = useState('');
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Популярные платформы
  const platforms = [
    'Steam', 'PlayStation Store', 'Xbox', 'Nintendo eShop', 'VK Play', 'Epic Games'
  ];

  const handlePay = (e) => {
    e.preventDefault();
    if (platform && accountId && amount) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onBack();
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Оплачено!</h2>
        <p className="text-gray-500 text-center">Баланс {platform} успешно пополнен.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 mr-3">
          ←
        </button>
        <h2 className="text-xl font-bold text-gray-800">Игры и сервисы</h2>
      </div>

      <form onSubmit={handlePay} className="space-y-4">
        {/* Выбор платформы */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Платформа</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all appearance-none"
          >
            <option value="" disabled>Выберите платформу...</option>
            {platforms.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Логин / ID аккаунта */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Логин или ID аккаунта</label>
          <input
            type="text"
            placeholder="Введите логин"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all"
          />
        </div>

        {/* Сумма */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Сумма пополнения (₽)</label>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg font-bold shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={!platform || !accountId || !amount}
          className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl text-lg font-semibold active:scale-95 transition-transform disabled:opacity-50 mt-2"
        >
          Пополнить
        </button>
      </form>
    </div>
  );
}