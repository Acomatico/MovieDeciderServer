'use strict'

const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;