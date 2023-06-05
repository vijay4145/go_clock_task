const express = require('express');
const router = express.Router();
const controller = require('../controller/OrderController');
const verifyToken = require('../middleware/fetchuser');

router.post('/postOrder', verifyToken, controller.post);

module.exports = router;