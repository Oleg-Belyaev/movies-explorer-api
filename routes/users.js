const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUserInfo, updateUser } = require('../controllers/users');
const { validateUpdateUserBody } = require('../middlewares/validations');

router.get('/me', auth, getUserInfo);
router.patch('/me', validateUpdateUserBody, auth, updateUser);

module.exports = router;
