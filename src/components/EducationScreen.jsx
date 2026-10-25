import { useState } from 'react';

export default function EducationScreen({ onBack }) {
  const [institution, setInstitution] = useState('');
  const [requisites, setRequisites] = useState('');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Популярные учреждения (для быстрого выбора)
  const popularInstitutions = [
    { name: 'МГУ им. Ломоносова', req: 'ИНН 7729012345, КПП 772901001' },
    { name: 'ВШЭ', req: 'ИНН 7714030726, КПП 771401001' },
    { name: 'МФТИ', req: 'ИНН 5004001234, КПП 500401001' },
    { name: 'СПбГУ', req: 'ИНН 7801023456, КПП 780101001' },
  ];

  const handlePay = (e) => {
    e.preventDefault();
    if (institution && requisites && amount) {
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
        <p className="text-gray-500 text-center">Платеж в {institution} успешно проведен.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 mr-3">
          ←
        </button>
        <h2 className="text-xl font-bold text-gray-800">Оплата образования</h2>
      </div>

      <form onSubmit={handlePay} className="space-y-4">
        {/* Быстрый выбор */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Популярные учреждения</label>
          <select 
            onChange={(e) => {
              const selected = popularInstitutions.find(i => i.name === e.target.value);
              if (selected) {
                setInstitution(selected.name);
                setRequisites(selected.req);
              }
            }}
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all appearance-none mb-4"
          >
            <option value="">Выберите из списка...</option>
            {popularInstitutions.map(inst => (
              <option key={inst.name} value={inst.name}>{inst.name}</option>
            ))}
          </select>
        </div>

        {/* Название учреждения */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Название учреждения</label>
          <input
            type="text"
            placeholder="Например, МГУ им. Ломоносова"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all"
          />
        </div>

        {/* Реквизиты */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Реквизиты (ИНН, КПП)</label>
          <input
            type="text"
            placeholder="ИНН 0000000000, КПП 000000000"
            value={requisites}
            onChange={(e) => setRequisites(e.target.value)}
            required
            className="w-full bg-white px-4 py-4 rounded-2xl text-sm shadow-sm border border-transparent focus:border-[#0a7d3b] focus:outline-none transition-all"
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
          disabled={!institution || !requisites || !amount}
          className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl text-lg font-semibold active:scale-95 transition-transform disabled:opacity-50 mt-2"
        >
          Оплатить
        </button>
      </form>
    </div>
  );
}