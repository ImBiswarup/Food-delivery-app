const { Router } = require('express');

const { signupHandler, loginHandler } = require('../controller/user');


const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);

module.exports = router;