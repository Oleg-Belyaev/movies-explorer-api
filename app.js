require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { notFoundErrorHandler, celebrateErrorHandler, errorHadler } = require('./middlewares/errors-handler');
const { limiter } = require('./middlewares/rateLimit');

const { NODE_ENV, PORT, MONGO_URL } = process.env;
const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorLogger);
app.use(notFoundErrorHandler);
app.use(celebrateErrorHandler);
app.use(errorHadler);

app.listen(NODE_ENV === 'production' ? PORT : 3000);
