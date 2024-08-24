const { Router } = require('express');

const { signupHandler, loginHandler, fetchUser, addOrderedFood } = require('../controller/user');


const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/profile', fetchUser);
router.post('/add-order', addOrderedFood);

module.exports = router;