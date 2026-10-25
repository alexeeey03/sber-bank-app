import { useState, useEffect } from 'react';
import Logo from '../components/Logo';

export default function Login({ onLogin, onFaceID }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    const savedPhone = localStorage.getItem('saved_phone');
    const savedPassword = localStorage.getItem('saved_password');
    if (savedPhone && savedPassword) {
      setPhone(savedPhone);
      setPassword(savedPassword);
    }
  }, []);

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 11) input = input.slice(0, 11);

    let formatted = '';
    if (input.length > 0) {
      if (input[0] === '7' || input[0] === '8') {
        formatted = '+7 ';
        input = input.slice(1);
      } else {
        formatted = '+7 ';
      }
      
      if (input.length > 0) formatted += `(${input.slice(0, 3)}`;
      if (input.length >= 3) formatted += `) ${input.slice(3, 6)}`;
      if (input.length >= 6) formatted += `-${input.slice(6, 8)}`;
      if (input.length >= 8) formatted += `-${input.slice(8, 10)}`;
    }
    setPhone(formatted);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 18 || !password) {
      setError('Заполните все поля');
      return;
    }
    if (password.length < 4) {
      setError('Пароль должен содержать минимум 4 символа');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('saved_phone', phone);
      localStorage.setItem('saved_password', password);
    } else {
      localStorage.removeItem('saved_phone');
      localStorage.removeItem('saved_password');
    }

    setError('');
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f2f4f7] flex flex-col justify-center px-6">
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto mb-4 drop-shadow-md">
          <Logo className="w-full h-full" />
        </div>
        {/* Надпись теперь зеленая */}
        <h1 className="text-2xl font-bold text-[#0a7d3b]">СБЕРБАНК</h1>
        <p className="text-gray-500 mt-2">Войдите в личный кабинет</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
          <input
            type="tel"
            placeholder="+7 (999) 000-00-00"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-green-500 focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
                setPassword(value);
                setError('');
              }}
              className="w-full bg-white px-4 py-4 rounded-2xl text-lg shadow-sm border border-transparent focus:border-green-500 focus:outline-none transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <input 
            type="checkbox" 
            id="remember" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-5 h-5 rounded text-[#0a7d3b] focus:ring-[#0a7d3b]"
          />
          <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
            Запомнить данные для входа
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium text-center">{error}</p>
        )}
        
        <button
          type="submit"
          className="w-full bg-[#0a7d3b] text-white py-4 rounded-2xl text-lg font-semibold active:scale-95 transition-transform mt-2"
        >
          Войти
        </button>
      </form>

      <div className="text-center mt-8 space-y-6">
        <button 
          onClick={() => {
            localStorage.removeItem('saved_phone');
            localStorage.removeItem('saved_password');
            setPhone('');
            setPassword('');
            setError('Данные для входа удалены');
            setTimeout(() => setError(''), 2000);
          }} 
          className="text-gray-500 text-sm font-medium"
        >
          Очистить сохраненные данные
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#f2f4f7] text-gray-500">или</span>
          </div>
        </div>

        <button 
          onClick={onFaceID}
          className="mx-auto flex items-center justify-center space-x-2 text-gray-800 font-medium bg-white px-6 py-3 rounded-2xl shadow-sm active:scale-95 transition-transform"
        >
          <svg className="w-6 h-6 text-[#0a7d3b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span>Войти по Face ID</span>
        </button>
      </div>
    </div>
  );
}