import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const user = req.query.user || '未知';
    const YN = req.query.YN || 'N';

    // Google Apps Script 網址
    const GAS_URL = `https://script.google.com/macros/s/AKfycbykMWmar1qVn8a8PgX3McaESdbVU0rjwsA-VwazcOosOouDoFohlkGen0OGIyB0L1FLgA/exec`;

    // 組成完整 URL，帶上參數
    const targetUrl = `${GAS_URL}?user=${encodeURIComponent(user)}&YN=${encodeURIComponent(YN)}`;

    // 轉發請求給 GAS
    const response = await fetch(targetUrl);
    const text = await response.text();

    res.status(200).send(text);
  } catch (error) {
    res.status(500).send('Proxy 錯誤: ' + error.message);
  }
}
