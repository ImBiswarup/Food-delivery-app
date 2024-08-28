const { Router } = require('express');

const { signupHandler, loginHandler, fetchUser, addOrderedFood, updateUser } = require('../controller/user');


const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/profile', fetchUser);
router.post('/add-order', addOrderedFood);
router.put('/update/:id', updateUser);

module.exports = router;