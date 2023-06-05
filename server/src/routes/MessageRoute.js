const express = require('express');
const router = express.Router();
const controller = require('../controller/MessageController');
const verifyToken = require('../middleware/fetchuser')

router.post('/add', verifyToken, controller.addMessage);
router.get('/get/:to', verifyToken, controller.getMessages);

module.exports = router;