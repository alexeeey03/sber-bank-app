export const userData = {
  name: 'Алексей',
  balance: 124350.00,
};

export const cards = [
  {
    id: 1,
    type: 'Дебетовая карта',
    number: '**** **** **** 4521',
    balance: 84350.00,
    gradient: 'from-[#0a7d3b] to-[#0f9a4a]',
  },
  {
    id: 2,
    type: 'Кредитная карта',
    number: '**** **** **** 8890',
    balance: 40000.00,
    gradient: 'from-gray-700 to-gray-900',
    // Новые данные для кредитки
    creditLimit: 100000.00,
    minPayment: 2000.00,
    paymentDate: '25 октября',
    gracePeriod: '120 дней',
  }
];

export const transactions = [
  // --- ОКТЯБРЬ 2026 ---
  { id: 1, title: 'Пятёрочка', date: '2026-10-24', time: '14:22', category: 'Супермаркеты', amount: -1240 },
  { id: 2, title: 'Кофейня "Шоколадница"', date: '2026-10-24', time: '09:15', category: 'Кафе', amount: -350 },
  { id: 3, title: 'Перевод от Марии', date: '2026-10-23', time: '18:45', category: 'Переводы', amount: 1500 },
  { id: 4, title: 'Яндекс.Музыка', date: '2026-10-22', time: '12:00', category: 'Подписки', amount: -299 },
  { id: 5, title: 'Аптека', date: '2026-10-20', time: '19:30', category: 'Здоровье', amount: -850 },
  { id: 6, title: 'Зарплата', date: '2026-10-10', time: '10:05', category: 'Пополнение', amount: 85000 },
  { id: 7, title: 'ВкусВилл', date: '2026-10-08', time: '20:10', category: 'Супермаркеты', amount: -2300 },
  { id: 8, title: 'Такси', date: '2026-10-05', time: '23:45', category: 'Транспорт', amount: -450 },
  { id: 9, title: 'Оплата ЖКХ', date: '2026-10-01', time: '08:30', category: 'Услуги', amount: -5400 },

  // --- СЕНТЯБРЬ 2026 ---
  { id: 10, title: 'Зарплата', date: '2026-09-10', time: '10:00', category: 'Пополнение', amount: 85000 },
  { id: 11, title: 'Перекрёсток', date: '2026-09-28', time: '19:15', category: 'Супермаркеты', amount: -3100 },
  { id: 12, title: 'Кино', date: '2026-09-25', time: '21:00', category: 'Развлечения', amount: -1200 },
  { id: 13, title: 'Перевод другу', date: '2026-09-22', time: '15:20', category: 'Переводы', amount: -5000 },
  { id: 14, title: 'Wildberries', date: '2026-09-18', time: '13:40', category: 'Покупки', amount: -6500 },
  { id: 15, title: 'Штраф ГИБДД', date: '2026-09-15', time: '11:10', category: 'Транспорт', amount: -500 },
  { id: 16, title: 'Кофейня', date: '2026-09-12', time: '08:50', category: 'Кафе', amount: -320 },
  { id: 17, title: 'МТС (связь)', date: '2026-09-05', time: '14:00', category: 'Услуги', amount: -800 },
  { id: 18, title: 'Ашан', date: '2026-09-02', time: '18:30', category: 'Супермаркеты', amount: -4500 },

  // --- АВГУСТ 2026 ---
  { id: 19, title: 'Зарплата', date: '2026-08-10', time: '10:00', category: 'Пополнение', amount: 85000 },
  { id: 20, title: 'Отель в Сочи', date: '2026-08-20', time: '16:45', category: 'Путешествия', amount: -25000 },
  { id: 21, title: 'Авиабилеты', date: '2026-08-18', time: '12:30', category: 'Путешествия', amount: -18000 },
  { id: 22, title: 'Такси в аэропорт', date: '2026-08-18', time: '05:00', category: 'Транспорт', amount: -1500 },
  { id: 23, title: 'Пятёрочка', date: '2026-08-15', time: '19:00', category: 'Супермаркеты', amount: -1800 },
  { id: 24, title: 'Перевод от брата', date: '2026-08-12', time: '14:15', category: 'Переводы', amount: 3000 },
  { id: 25, title: 'Netflix', date: '2026-08-05', time: '10:00', category: 'Подписки', amount: -1200 },
  { id: 26, title: 'Кофейня', date: '2026-08-03', time: '09:30', category: 'Кафе', amount: -400 },
  { id: 27, title: 'Оплата ЖКХ', date: '2026-08-01', time: '08:00', category: 'Услуги', amount: -5200 },
];
export const documentsData = {
  passport: {
    series: '45 12',
    number: '123456',
    issuedBy: 'ОВД Тверского района г. Москвы',
    issuedDate: '15.06.2015',
    code: '770-001'
  },
  snils: '123-456-789 00',
  inn: '771234567890'
};