const { Router } = require('express');

const { signupHandler, loginHandler, fetchUser } = require('../controller/user');


const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/profile', fetchUser);

module.exports = router;