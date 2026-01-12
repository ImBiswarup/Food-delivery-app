const { Router } = require('express');
const { createOrder } = require('../controller/payment');
const router = Router();

router.post('/order', createOrder);

module.exports = router;