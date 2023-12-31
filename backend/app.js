const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const NotFound = require('./errors/NotFound');
const { MONGODB_URL, PORT } = require('./utils/constants');

const app = express();

mongoose.connect(MONGODB_URL);

const corsOptions = {
  origin: [
    // 'http://localhost:3000',
    // 'http://localhost:3001',
    'http://express-mesto-gha-rakleed.nomoredomains.xyz',
    'https://express-mesto-gha-rakleed.nomoredomains.xyz',
  ],
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(requestLogger);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFound('Такая страница не существует.')));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка.' } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
