const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const verifyToken = require('../middleware/fetchuser');

router.post('/createuser', userController.post);
router.post('/login', userController.login)

module.exports = router;