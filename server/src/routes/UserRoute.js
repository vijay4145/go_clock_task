const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/createuser', userController.post);

module.exports = router;