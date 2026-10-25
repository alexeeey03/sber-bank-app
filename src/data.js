export const userData = {
  name: 'Алексей',
  balance: 718.22,
};

export const cards = [
  {
    id: 1,
    type: 'Дебетовая карта',
    number: '**** **** **** 2080',
    balance: 718.22,
    gradient: 'from-[#0a7d3b] to-[#0f9a4a]',
    expiry: '07/36', // <-- Добавили
  },
  {
    id: 2,
    type: 'Кредитная карта',
    number: '**** **** **** 4562',
    balance: 110068.39,
    gradient: 'from-gray-700 to-gray-900',
    // Новые данные для кредитки
    creditLimit: 180000.00,
    minPayment: 4298.11,
    paymentDate: '30 ноября ',
    gracePeriod: '-',
     expiry: '06/28', // <-- Добавили
  }
];

export const transactions = [
  // --- ОКТЯБРЬ 2026 ---
  { id: 1, title: 'Перевод на кредитную карту.', date: '2026-10-24', time: '20:19', category: 'Перевод между счетами', amount: -59700 },
  { id: 2, title: 'Алексей Сергеевич Б.', date: '2026-10-24', time: '20:19', category: 'Пополнение', amount: 59700 },
  { id: 3, title: 'Ксения Андреевна Л.', date: '2026-10-22', time: '13:28', category: 'Пополнение', amount: 5000 },
  { id: 4, title: 'Яндекс.Музыка', date: '2026-10-22', time: '12:00', category: 'Подписки', amount: -499 },
  { id: 5, title: 'Алексей Сергеевич Б.', date: '2026-10-22', time: '15.32', category: 'Переводы', amount: -9500 },
  { id: 6, title: 'Юлия Александровна Б.', date: '2026-10-21', time: '10:02', category: 'Пополнение', amount: 2300 },
  { id: 7, title: 'Юлия Александровна Б.', date: '2026-10-15', time: '1435', category: 'Пополнение', amount: 7000 },
  { id: 8, title: 'Алексей Сергеевич Б.', date: '2026-10-10', time: '00:38', category: 'Переводы', amount: -59000 },
  { id: 9, title: 'Розалия Зульфановна Н.', date: '2026-10-10', time: '00:34', category: 'Пополнение', amount: 30000 },
  { id: 10, title: 'Анна Сергеевна Д.', date: '2026-10-09', time: '18:41', category: 'Пополнение', amount: 29000 },

  // --- СЕНТЯБРЬ 2026 ---
  { id: 11, title: 'Playerok_Астана KZ', date: '2026-09-26', time: '23:02', category: 'Услуги', amount: -3160.98 },
  { id: 12, title: 'Юлия Александровна Б.', date: '2026-09-26', time: '23:00', category: 'Пополнение', amount: 4000 },
  { id: 13, title: 'Алексей Сергеевич Б.', date: '2026-09-24', time: '17:15', category: 'Переводы', amount: -40000 },
  { id: 14, title: 'Перевод на кредитную карту.', date: '2026-09-24', time: '16:55', category: 'Перевод между счетами', amount: -7500 },
  { id: 15, title: 'Юлия Александровна Б.', date: '2026-09-24', time: '16:50', category: 'Пополнение', amount: 50000 },
  { id: 16, title: 'Playerok_Астана KZ', date: '2026-09-17', time: '17:56', category: 'Услуги', amount: -3160.98 },
  { id: 17, title: 'Юлия Александровна Б.', date: '2026-09-17', time: '17:29', category: 'Пополнение', amount: 3000 },
  { id: 18, title: 'Юлия Александровна Б.', date: '2026-09-13', time: '12:27', category: 'Пополнение', amount: 1000 },
  { id: 19, title: 'Алексей Сергеевич Б.', date: '2026-09-12', time: '17:15', category: 'Переводы', amount: -2500 },
  { id: 20, title: 'Юлия Александровна Б.', date: '2026-09-11', time: '15:34', category: 'Пополнение', amount: 2000 },
  { id: 21, title: 'Pyaterochka 25682 SPB Rus', date: '2026-09-09', time: '18:17', category: 'Супермаркеты', amount: -721.68 },
  { id: 22, title: 'Алексей Сергеевич Б.', date: '2026-09-05', time: '21:13', category: 'Переводы', amount: -49000 },
  { id: 23, title: 'Анна Сергеевна Д.', date: '2026-09-05', time: '20:22', category: 'Пополнение', amount: 29000 },
  { id: 24, title: 'Розалия Зульфановна Н.', date: '2026-09-03', time: '15:30', category: 'Пополнение', amount: 20000 },

  

  // --- АВГУСТ 2026 ---
   { id: 25, title: 'Перевод на кредитную карту.', date: '2026-08-28', time: '21:53', category: 'Перевод между счетами', amount: -7254.95 },
   { id: 25, title: 'Юлия Александровна Б.', date: '2026-08-28', time: '21:50', category: 'Пополнение', amount: 10000 },
   { id: 26, title: 'Алексей Сергеевич Б.', date: '2026-09-23', time: '23:56', category: 'Переводы', amount: -1500 },
   { id: 27, title: 'Юлия Александровна Б.', date: '2026-08-22', time: '22:39', category: 'Пополнение', amount: 1500 },
   { id: 28, title: 'Перекрёсток', date: '2026-08-18', time: '08:25', category: 'Супермаркеты', amount: -339.97 },
   { id: 29, title: 'Алексей Сергеевич Б.', date: '2026-08-16', time: '20:05', category: 'Переводы', amount: -6500 },
   { id: 30, title: 'Юлия Александровна Б.', date: '2026-08-16', time: '19:59', category: 'Пополнение', amount: 7000 },
  
];
export const documentsData = {
  passport: {
    series: '4023',
    number: '464208',
    issuedBy: 'ГУ МВД РОССИИ ПО Г. САНКТ-ПЕТЕРБУРГУ И ЛЕНИНГРАДСКОЙ ОБЛАСТИ',
    issuedDate: '21.03.2023',
    code: '780-036'
  },
  snils: '174-882-602 07',
  inn: '026616615894'
};