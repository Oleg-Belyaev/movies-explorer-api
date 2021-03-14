const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validateCreateUserBody, validateLoginBody } = require('../middlewares/validations');

router.post('/signup', validateCreateUserBody, createUser);
router.post('/signin', validateLoginBody, login);
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);

module.exports = router;
