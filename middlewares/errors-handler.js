const { isCelebrateError } = require('celebrate');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');

const notFoundErrorHandler = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    if (err.details.get('params')) {
      throw new ValidationError(err.details.get('params').details[0].message);
    } else {
      throw new ValidationError(err.details.get('body').details[0].message);
    }
  }
  next(err);
};

const errorHadler = (err, req, res, next) => {
  const { statusCode = '500', message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === '500' ? 'На сервере произошла ошибка' : message });
  next();
};

module.exports = {
  notFoundErrorHandler,
  celebrateErrorHandler,
  errorHadler,
};
