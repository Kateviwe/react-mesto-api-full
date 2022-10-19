// Мидлвэр для работы с механизмом CORS

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://mesto.frontend.kateviwe.nomoredomains.icu/sign-in',
  'https://mesto.frontend.kateviwe.nomoredomains.icu/sign-in',
];

module.exports = (req, res, next) => {
  // Сохраняем источник запроса в переменную origin
  const { origin } = req.headers;
  // Сохраняем метод запроса в переменную method
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  // Проверим, есть ли источник запроса среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    // Тогда это предварительный CORS-запрос
    // Разрешаем кросс-доменные запросы типов, указанных в DEFAULT_ALLOWED_METHODS
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // Разрешаем кросс-доменные запросы с заголовками, указанными в requestHeaders
    // Обычно используют значение заголовка Access-Control-Request-Headers,
    // который передает браузер вместе с запросом
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // Завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  next();
};
