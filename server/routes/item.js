const { Router } = require('express');
const { addItems, getItems } = require('../controller/items');

const router = Router();

router.get("/get-items", getItems);
router.post("/add-items", addItems);

module.exports = router;