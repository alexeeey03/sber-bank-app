import { useState } from 'react';

export default function InternetScreen({ onBack }) {
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    if (address && account && amount) {
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
        <p className="text-gray-500 text-center">Интернет и ТВ успешно оплачены.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 mr-3">
          ←
        </button>
        <h2 className="text-xl font-bold text-gray-800">Интернет и ТВ</h2>
      </div>

      <form onSubmit={handlePay} className="space-y-4">
        {/* Адрес */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Адрес подключения</label>
          <input
            type="text"
            placeholder="Улица, дом, квартира"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all"
          />
        </div>

        {/* Лицевой счет */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Лицевой счет</label>
          <input
            type="text"
            placeholder="Например, 123456789"
            value={account}
            onChange={(e) => setAccount(e.target.value.replace(/\D/g, ''))} // Только цифры
            required
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all"
          />
        </div>

        {/* Сумма */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Сумма (₽)</label>
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
          disabled={!address || !account || !amount}
          className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl text-lg font-semibold active:scale-95 transition-transform disabled:opacity-50 mt-2"
        >
          Оплатить
        </button>
      </form>
    </div>
  );
}