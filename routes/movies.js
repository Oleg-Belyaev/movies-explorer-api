const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateId, validateMovieBody } = require('../middlewares/validations');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', auth, getMovies);
router.post('/', validateMovieBody, auth, createMovie);
router.delete('/:movieId', validateId, auth, deleteMovie);

module.exports = router;
