require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Подключим модуль body-parser для объединения всех пакетов на принимающей стороне
const bodyParser = require('body-parser');
// Подключим модуль cookie-parser для извлечения данных из заголовка Cookie (чтение куки на сервере)
// и преобразования строки в объект
const cookieParser = require('cookie-parser');

// Подключим обработчик ошибок celebrate
const { errors } = require('celebrate');

// Импорт роутеров
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// Импортируем логгеры (сбор логов при запросах к серверу и ошибках)
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const {
  postNewUser,
  login,
  getCookiesDelete,
} = require('./controllers/users');

const {
  postNewUserValidation,
  loginValidation,
} = require('./middlewares/validation');

const { NotFoundError } = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

// Создадим приложение методом express()
const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Подключим, и куки станут доступны в объекте req.cookies.jwt
app.use(cookieParser());

// Подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

// Подключаем логгер запросов (обязательно до всех обработчиков роутов)
app.use(requestLogger);

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Роуты без авторизации
app.post('/signup', postNewUserValidation, postNewUser);
app.post('/signin', loginValidation, login);

// Роуты с авторизацией
app.use(auth);
// Запрос на api с '/deletecookies'
app.post('/signout', getCookiesDelete);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Обработка несуществующих роутов
// 404
app.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

// Подключаем логгер ошибок (обязательно после всех обработчиков роутов, но до обработчиков ошибок)
app.use(errorLogger);

// Обработчик ошибок, возникших при валидации данных с помощью библиотеки Joi
// Будет обрабатывать только ошибки, которые сгенерировал celebrate
// 400 (Bad Request)
app.use(errors());
// Централизованный обработчик ошибок
// Перехватит все остальные ошибки
app.use(errorHandler);

app.listen(PORT);
