const mongoose = require('mongoose');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { config } = require('./config');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1500,
});

mongoose
  .connect(config.MONGO_URL);

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://shtrihh.students.nomoredomainsmonster.ru',
    'https://shtrihh.students.nomoredomainsmonster.ru',
    'https://api.shtrihh.students.nomoredomainsmonster.ru',
    'http://api.shtrihh.students.nomoredomainsmonster.ru',
  ],
  credentials: true,
  maxAge: 30,
}));

app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(config.PORT || 3000);
