const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundErr');
const serverError = require('./middlewares/serverErr');
const {
  createUser,
  login,
} = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const options = {
  origin: [
    'https://cherbot1.nomoredomains.sbs',
    'http://cherbot1.nomoredomains.sbs',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .pattern(/^http(s)?:\/\/(w{3}\.)?([da-z\-]+\.)+([\w#!:.?+=&%\-])?/),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  }),
}), createUser);

app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));

app.use('/*', auth, () => {
  throw new NotFoundError('Страницы не существует');
});

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT);