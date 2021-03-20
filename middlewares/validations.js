const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, halpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return halpers.message('Невалидный id фильма');
    }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, halpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return halpers.message('Поле "image" должно быть URL-адресом');
    })
      .messages({
        'string.required': 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string().required().custom((value, halpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return halpers.message('Поле "trailer" должно быть URL-адресом');
    })
      .messages({
        'string.required': 'Поле "trailer" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().custom((value, halpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return halpers.message('Поле "thumbnail" должно быть URL-адресом');
    })
      .messages({
        'string.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateId,
  validateMovieBody,
  validateUpdateUserBody,
  validateCreateUserBody,
  validateLoginBody,
};
