'use strict'

const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/users/registerUser');

router.post('/register', registerUser);

module.exports = router;