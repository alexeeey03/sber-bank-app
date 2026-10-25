export default function DocumentModal({ doc, onClose }) {
  if (!doc) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-[#f2f4f7] rounded-[32px] p-6 animate-scale-up flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{doc.title}</h2>

        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4 mb-6">
          {doc.details.map((detail, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
              <span className="text-sm text-gray-500">{detail.label}</span>
              <span className="font-medium text-gray-800 text-sm text-right max-w-[60%]">{detail.value}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-800 py-4 rounded-2xl font-semibold active:scale-95 transition-transform"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}