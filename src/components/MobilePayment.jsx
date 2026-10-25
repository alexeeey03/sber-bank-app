import { useState } from 'react';

export default function MobilePayment({ onBack }) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Тестовая контактная книга
  const contacts = [
    { id: 1, name: 'Мама', phone: '+7 (987) 020-52-27' },
    { id: 2, name: 'Славик', phone: '+7 (921) 399-63-68' },
    { id: 3, name: 'Мухаммад', phone: '+7 (981) 119-32-92' },
    
  ];

  const handlePay = (e) => {
    e.preventDefault();
    if (phone && amount) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onBack(); // Возвращаемся в меню оплаты
      }, 2000);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 mr-3">
          ←
        </button>
        <h2 className="text-xl font-bold text-gray-800">Мобильная связь</h2>
      </div>

      {isSuccess ? (
        <div className="bg-green-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Оплачено!</h3>
          <p className="text-gray-500">Платеж на номер {phone} успешно проведен.</p>
        </div>
      ) : (
        <form onSubmit={handlePay} className="space-y-6">
          {/* Контактная книга */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Из контактов</label>
            <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
              {contacts.map(contact => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setPhone(contact.phone)}
                  className="flex-shrink-0 flex flex-col items-center space-y-1 w-16"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg font-bold text-[#0a7d3b] shadow-sm">
                    {contact.name[0]}
                  </div>
                  <span className="text-[10px] text-gray-600 truncate w-full text-center">{contact.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ручной ввод */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Номер телефона</label>
            <input
              type="tel"
              placeholder="+7 (999) 000-00-00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-green-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Сумма (₽)</label>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full bg-white px-4 py-4 rounded-2xl text-lg font-bold shadow-sm border border-transparent focus:border-green-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!phone || !amount}
            className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl text-lg font-semibold active:scale-95 transition-transform disabled:opacity-50"
          >
            Оплатить
          </button>
        </form>
      )}
    </div>
  );
}