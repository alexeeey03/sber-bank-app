export default function FinesScreen({ onBack }) {
  return (
    <div className="animate-fade-in flex flex-col items-center py-6">
      {/* Зеленая галочка */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">Штрафов нет</h2>
      <p className="text-gray-500 text-center mb-8 px-4">
        У вас нет неоплаченных штрафов ГИБДД. Соблюдайте ПДД и будьте осторожны на дорогах!
      </p>

      <button 
        onClick={onBack}
        className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl font-semibold active:scale-95 transition-transform"
      >
        Вернуться назад
      </button>
    </div>
  );
}