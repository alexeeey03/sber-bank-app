import { useState } from 'react';

export default function UtilityScreen({ onBack }) {
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!address) return;

    setIsSearching(true);
    setShowEmptyState(false);

    // Имитация поиска (1.5 секунды)
    setTimeout(() => {
      setIsSearching(false);
      setShowEmptyState(true);
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 mr-3">
          ←
        </button>
        <h2 className="text-xl font-bold text-gray-800">Оплата ЖКХ</h2>
      </div>

      {!showEmptyState ? (
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Введите адрес</label>
            <input
              type="text"
              placeholder="Улица, дом, квартира"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!address || isSearching}
            className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl text-lg font-semibold active:scale-95 transition-transform disabled:opacity-50 flex justify-center items-center"
          >
            {isSearching ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              'Найти счета'
            )}
          </button>
        </form>
      ) : (
        /* Экран "Ничего не найдено" */
        <div className="animate-slide-up flex flex-col items-center justify-center py-6 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Счета не найдены</h3>
          <p className="text-gray-500 text-sm mb-8">
            По адресу «{address}» не найдено лицевых счетов. Проверьте правильность ввода или обратитесь в управляющую компанию.
          </p>
          
          <button
            onClick={() => {
              setShowEmptyState(false);
              setAddress('');
            }}
            className="w-full bg-gray-200 text-gray-800 py-4 rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            Попробовать другой адрес
          </button>
        </div>
      )}
    </div>
  );
}