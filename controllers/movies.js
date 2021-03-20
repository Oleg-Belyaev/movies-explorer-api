const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const id = req.user._id;
  const {
    country, director, duration, year,
    description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: id,
    movieId,
  })
    .then(((movie) => res.send(movie)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      }
      next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if ((movie !== null) && ((movie.owner.toString() || '') === req.user._id)) {
        movie.remove();
        res.send(movie);
      }
      if (movie === null) {
        throw new NotFoundError(`Нет фильма с id ${req.params.cardId}`);
      } else {
        throw new AccessError('Нельзя удалять фильмы, созданные другим пользователем');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
