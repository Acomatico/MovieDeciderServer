'use strict';

const uuidv4 = require('uuid').v4;
const roomRepository = require('../../repositories/roomRepository');
const validateCreateRoom = require('../../input/rooms/createRoomInput');

async function createRoom(req,res,next) {
    const { user } = req.claims;
    const inputData = req.body;
    try {
        await validateCreateRoom(inputData);
    } catch(error) {
        return res.status(400).send({
            error: 'badRequest',
            message: error.message
        });
    }

    const uuid = uuidv4();
    const now = new Date();
    const movies = inputData.map(movie => {
        const movieUuid = uuidv4();
        return {
            uuid: movieUuid,
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            createdAt: now,
            updatedAt: now
        }
    });

    const newRoom = {
        uuid: uuid,
        creator: user.uuid,
        code: inputData.code,
        movies: movies,
        createdAt: now,
        updatedAt: now,
        active: false
    };

    await roomRepository.create(newRoom);

    return res.status(200).send({
        resources: newRoom
    })
}



module.exports = createRoom;
