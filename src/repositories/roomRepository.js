'use strict';

const roomModel = require('../models/room');

async function create(room) {
    await roomModel.create(room);
}

async function findOneByCode(code) {
    const room = await roomModel.findOne({code: code});

    return room;
}

async function updateRoom(room) {
    await roomModel.updateOne({code: room.code}, room)
}

module.exports = {create, findOneByCode, updateRoom}