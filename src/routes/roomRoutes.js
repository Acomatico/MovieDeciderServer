'use strict'

const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../middlewares/authorizationMiddleware')
const createRoom = require('../controllers/rooms/createRoom');
const getRoom = require('../controllers/rooms/getRoom')

router.post('/', authorizationMiddleware, createRoom);
router.get('/:roomCode', getRoom)

module.exports = router;
