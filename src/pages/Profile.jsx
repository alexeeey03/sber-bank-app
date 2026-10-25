import { useState } from 'react';
import { userData, documentsData } from '../data';
import DocumentModal from '../components/DocumentModal';

export default function Profile({ onLogout }) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Формируем данные для документов
  const docs = [
    {
      id: 'passport',
      title: 'Паспорт РФ',
      icon: '🪪',
      details: [
        { label: 'Серия и номер', value: `${documentsData.passport.series} ${documentsData.passport.number}` },
        { label: 'Кем выдан', value: documentsData.passport.issuedBy },
        { label: 'Дата выдачи', value: documentsData.passport.issuedDate },
        { label: 'Код подразделения', value: documentsData.passport.code },
      ]
    },
    {
      id: 'snils',
      title: 'СНИЛС',
      icon: '🆔',
      details: [
        { label: 'Номер СНИЛС', value: documentsData.snils },
        { label: 'Статус', value: 'Действителен' },
      ]
    },
    {
      id: 'inn',
      title: 'ИНН',
      icon: '📄',
      details: [
        { label: 'ИНН', value: documentsData.inn },
        { label: 'Статус', value: 'Действителен' },
      ]
    }
  ];

  return (
    <div className="p-6 pt-14 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Профиль</h1>

      {/* Карточка пользователя */}
      <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-[#0a7d3b] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {userData.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-gray-500">+7 (999) 123-45-67</p>
          
        </div>
      </div>

      {/* Мои документы */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Мои документы</h3>
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          {docs.map((doc, index) => (
            <button 
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`w-full flex items-center justify-between p-5 active:bg-gray-50 transition-colors ${
                index !== docs.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{doc.icon}</span>
                <span className="font-medium text-gray-800">{doc.title}</span>
              </div>
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          ))}
        </div>
      </div>

      {/* Настройки */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Настройки</h3>
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3 text-gray-700">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span className="font-medium">Настройки приложения</span>
            </div>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
          
          <button className="w-full flex items-center justify-between p-5 active:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3 text-gray-700">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span className="font-medium">Безопасность</span>
            </div>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Кнопка выхода */}
      <button 
        onClick={onLogout}
        className="w-full bg-white text-red-500 font-semibold py-4 rounded-2xl shadow-sm active:scale-95 transition-transform"
      >
        Выйти из аккаунта
      </button>

      <p className="text-center text-xs text-gray-400 mt-8">Версия 1.0.0</p>

      {/* Модалка документа */}
      {selectedDoc && (
        <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}