const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router.post('/signUp',userController.signUp);

router.post('/login',userController.login);

module.exports = router;