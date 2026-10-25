export function openReceipt(tx) {
  const now = new Date();
  const dateObj = new Date(tx.date);
  
  // Время
  const timeStr = tx.time ? `${tx.time}:${String(now.getSeconds()).padStart(2, '0')}` : `12:00:00`;
  
  // ID операции
  const txId = `${dateObj.getFullYear()}${String(dateObj.getMonth() + 1).padStart(2, '0')}${String(dateObj.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  // Код авторизации
  const authCode = Math.floor(Math.random() * 900000 + 100000).toString();
  
  // Сумма и дата
  const absAmount = Math.abs(tx.amount);
  const formattedAmount = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(absAmount);
  const dateStr = dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  const html = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Чек ${tx.title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        
        body {
          font-family: 'Roboto', sans-serif;
          background: #e9ecef;
          display: flex;
          justify-content: center;
          padding: 20px;
          color: #1c1c1e;
          margin: 0;
        }
        .receipt {
          background: white;
          width: 100%;
          max-width: 380px;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        
        /* Шапка */
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f2f2f7;
        }
        
        /* Логотип */
        .header svg {
          width: 60px;
          height: 60px;
          margin-right: 15px;
        }
        
        .header-text {
          display: flex;
          flex-direction: column;
        }
        .logo {
          color: #0a7d3b;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 1px;
          line-height: 1;
        }
        .subtitle {
          color: #8e8e93;
          font-size: 11px;
          margin-top: 4px;
        }
        
        /* Основная инфа */
        .tx-id {
          font-size: 10px;
          color: #8e8e93;
          text-align: center;
          margin-bottom: 25px;
          background: #f2f2f7;
          padding: 6px;
          border-radius: 6px;
        }
        .title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .amount {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: -0.5px;
        }
        .amount.positive {
          color: #0a7d3b;
        }
        
        /* Таблица */
        .details {
          border-top: 1px dashed #d1d1d6;
          border-bottom: 1px dashed #d1d1d6;
          padding: 20px 0;
          margin-bottom: 25px;
        }
        .row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 12px;
        }
        .row:last-child {
          margin-bottom: 0;
        }
        .row span:first-child {
          color: #8e8e93;
        }
        .row span:last-child {
          font-weight: 500;
          text-align: right;
          max-width: 60%;
        }
        .status-done {
          color: #0a7d3b;
          font-weight: 500;
        }
        
        /* Печать */
        .stamp-container {
          display: flex;
          justify-content: center;
          margin-top: auto;
          padding-top: 20px;
        }
        .stamp {
          border: 2px solid #1a4a9c;
          border-radius: 4px;
          padding: 10px 20px;
          color: #1a4a9c;
          text-align: center;
          opacity: 0.85;
          transform: rotate(-3deg);
          display: inline-block;
        }
        .stamp-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .stamp-text {
          font-size: 10px;
          font-weight: 500;
        }
        
        @media print {
          body { background: white; padding: 0; }
          .receipt { box-shadow: none; padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <!-- Логотип (сплошной зеленый) -->
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="white" />
            <rect x="40" y="25" width="38" height="14" rx="3" fill="#0a7d3b" />
            <rect x="40" y="61" width="38" height="14" rx="3" fill="#0a7d3b" />
            <path d="M 38 28 A 3 3 0 0 0 35 25 L 30 25 A 8 8 0 0 0 22 33 L 22 67 A 8 8 0 0 0 30 75 L 35 75 A 3 3 0 0 0 38 72 Z" fill="#0a7d3b" />
          </svg>
          <div class="header-text">
            <div class="logo">СБЕРБАНК</div>
            <div class="subtitle">Электронная квитанция</div>
          </div>
        </div>

        <div class="tx-id">ID операции: ${txId}</div>
        
        <div class="title">${tx.title}</div>
        <div class="amount ${tx.amount > 0 ? 'positive' : ''}">
          ${tx.amount > 0 ? '+' : '-'} ${formattedAmount}
        </div>

        <div class="details">
          <div class="row"><span>Дата и время</span><span>${dateStr}, ${timeStr}</span></div>
          <div class="row"><span>Категория</span><span>${tx.category}</span></div>
          <div class="row"><span>Статус</span><span class="status-done">Выполнено</span></div>
          <div class="row"><span>Счет списания</span><span>Дебетовая карта •• 4521</span></div>
          <div class="row"><span>Код авторизации</span><span>${authCode}</span></div>
        </div>

        <div class="stamp-container">
          <div class="stamp">
            <div class="stamp-title">ПАО Сбербанк</div>
            <div class="stamp-text">Перевод выполнен</div>
          </div>
        </div>
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 500);
        }
      </script>
    </body>
    </html>
  `;

  const win = window.open('about:blank', '_blank');
  win.document.open();
  win.document.write(html);
  win.document.close();
}
