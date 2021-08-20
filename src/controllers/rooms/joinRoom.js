'use strict';

const jwt = require('jsonwebtoken');
const roomRepository = require('../../repositories/roomRepository');
const userRepository = require('../../repositories/userRepository');

async function joinRoom(roomCode, socket) {
    let i = 0;
    const room = await roomRepository.findOneByCode(roomCode);

    if (!room) {
        socket.send(JSON.stringify({
            error: 'Room not found'
        }));
        socket.close();
        return;
    }

    let user = null;

    socket.send(JSON.stringify({
        isLast: i + 1 === room.movies.length ? true : false,
        movie: room.movies[0]
    }));

    socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        const {command, approved, authorization} = parsedMessage;

        extractUserFromToken(authorization).then(value => {
            user = value;

            if (!user) {
                socket.send('User was not found');
                socket.close();
                return;
            }

            if (room.voters.filter(voterId => voterId === user.Id) > 0) {
                console.log('closing shit');
                socket.close();
            }
        });

    
        if ("nextMovie" === command) {
            if (room.movies.length > i) {

                if (approved) {
                    room.movies[i].rating++;
                }

                i++;
                socket.send(JSON.stringify({
                    isLast: i + 1 === room.movies.length ? true : false,
                    movie: room.movies[i]
                }));
            }
        }

    });

    socket.on('close', () => {
        if (null !== user) {
            room.voters.push(user.id)
        }

        roomRepository.updateRoom(room);
        console.log('connection closed');
    })

}

function extractUserFromToken(token) {
    return new Promise((resolve, reject) => {
        const jwtSecret = process.env.JWT_SECRET;
        const tokenData = jwt.verify(token, jwtSecret);
    
        userRepository.findOneBy({uuid: tokenData.uuid}).then(user => {
            resolve(user);
        });
    })
}

module.exports = joinRoom;
