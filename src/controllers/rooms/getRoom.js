'use strict'

const roomRepository = require('../../repositories/roomRepository');
const selectHighestRatedMovie = require('../../services/selectHighestRatedMovieForRoomService');

async function getRoom(req,res,next) {
    const { roomCode } = req.params;
    if (!roomCode) {
        return res.status(400).send({
            'error': 'badRequest',
            'message': 'missing mandatory parameter "roomCode"'
        })
    }

    const room = await roomRepository.findOneByCode(roomCode);

    if (!room) {
        return res.status(404).send({
            'error': 'notFound',
            'message': `room with code ${roomCode} was not found`
        });
    }
    
    const selectedMovie = selectHighestRatedMovie(room.movies);

    const result = {
        roomCode: room.code,
        selectedMovie: {
            title: selectedMovie.title,
            rating: selectedMovie.rating
        }
    };

    return res.status(200).send(result);
}

module.exports = getRoom;
