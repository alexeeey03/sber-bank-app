import { useState } from 'react';
import Login from './pages/Login';
import FaceID from './pages/FaceID';
import Home from './pages/Home';
import History from './pages/History';
import Transfers from './pages/Transfers';
import Profile from './pages/Profile';
import SplashScreen from './components/SplashScreen';
import { userData, cards as initialCards } from './data';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [balance, setBalance] = useState(userData.balance);
  const [cards, setCards] = useState(initialCards);
  const [toast, setToast] = useState(null);

  const handleInternalTransfer = (fromId, toId, amount) => {
    setCards(prevCards => {
      return prevCards.map(card => {
        if (card.id === fromId) return { ...card, balance: card.balance - amount };
        if (card.id === toId) return { ...card, balance: card.balance + amount };
        return card;
      });
    });
    
    setToast('Перевод между картами выполнен!');
    setTimeout(() => setToast(null), 3000);
  };

  // Обычный перевод (списание с карты) с учетом комиссии для кредитной карты
  const handleTransfer = (fromId, amount) => {
    const fromCard = cards.find(c => c.id === fromId);
    // Если карта кредитная (id: 2), берем комиссию 1.5%
    const commission = fromCard?.id === 2 ? amount * 0.015 : 0;
    const totalAmount = amount + commission;

    setCards(prevCards => 
      prevCards.map(card => 
        card.id === fromId ? { ...card, balance: card.balance - totalAmount } : card
      )
    );
    
    // Уменьшаем общий баланс на сумму + комиссию
    setBalance(prev => prev - totalAmount);
    
    // Показываем уведомление
    const commissionText = commission > 0 
      ? ` (включая комиссию ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(commission)})` 
      : '';
      
    setToast(`Перевод на сумму ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount)} выполнен${commissionText}!`);
    setTimeout(() => setToast(null), 3000);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (isScanning) {
    return <FaceID onSuccess={() => {
      setIsScanning(false);
      setIsLoggedIn(true);
    }} />;
  }

  if (!isLoggedIn) {
    return (
      <Login 
        onLogin={() => setIsLoggedIn(true)} 
        onFaceID={() => setIsScanning(true)} 
      />
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': 
        return <Home onLogout={() => setIsLoggedIn(false)} onNavigate={setActiveTab} balance={balance} cards={cards} />;
      case 'transfers': 
        return <Transfers 
                 onTransfer={handleTransfer} 
                 onInternalTransfer={handleInternalTransfer} 
                 cards={cards} 
               />;
      case 'history': 
        return <History />;
      case 'profile': 
        return <Profile onLogout={() => setIsLoggedIn(false)} />;
      default: 
        return <Home onLogout={() => setIsLoggedIn(false)} onNavigate={setActiveTab} balance={balance} cards={cards} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4f7]">
      <main className="pb-24">
        <div key={activeTab} className="animate-fade-in">
          {renderScreen()}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-[#0a7d3b]' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span className="text-[10px] font-medium">Главная</span>
          </button>
          
          <button onClick={() => setActiveTab('transfers')} className={`flex flex-col items-center space-y-1 ${activeTab === 'transfers' ? 'text-[#0a7d3b]' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
            <span className="text-[10px] font-medium">Переводы</span>
          </button>
          
          <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center space-y-1 ${activeTab === 'history' ? 'text-[#0a7d3b]' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            <span className="text-[10px] font-medium">История</span>
          </button>
          
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-[#0a7d3b]' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span className="text-[10px] font-medium">Профиль</span>
          </button>
        </div>
      </nav>

      {toast && (
        <div className="fixed top-6 left-4 right-4 z-[100] animate-slide-down">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <p className="text-sm font-medium text-gray-800">{toast}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;