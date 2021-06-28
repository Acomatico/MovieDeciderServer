'use strict'

const express = require('express');
const router = express.Router();
const createRoom = require('../controllers/rooms/createRoom');

router.post('/', createRoom);

module.exports = router;