require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const cors = require('./middlewares/cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notFoundError');
const {
  login,
  postUser,
} = require('./controllers/users');
const {
  isAuthorized,
} = require('./middlewares/auth');

const app = express();
const { port = 3000 } = process.env;
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(cors);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('Невалидная ссылка');
    }),
  }),
}), postUser);

app.use('/users', isAuthorized, userRouter);
app.use('/cards', isAuthorized, cardRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({ message: 'Что-то пошло не так' });
});

app.listen(port);
