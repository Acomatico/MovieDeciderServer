'use strict';

const roomModel = require('../models/room');

async function create(room) {
    await roomModel.create(room);
}

module.exports = {create}