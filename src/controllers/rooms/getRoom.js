'use strict'

const roomRepository = require('../../repositories/roomRepository');

async function getRoom(req,res,next) {
    const { roomCode } = req.params;
    if (!roomCode) {
        return res.status(400).send({
            'error': 'badRequest',
            'message': 'missing mandatory parameter "roomCode"'
        })
    }

    const room = roomRepository.findOneByCode(roomCode);

    if (!room) {
        return res.status(404).send({
            'error': 'notFound',
            'message': `room with code ${roomCode} was not found`
        });
    }
}

module.exports = getRoom;
