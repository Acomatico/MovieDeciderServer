'use strict';

const roomRepository = require('../../repositories/roomRepository');

async function joinRoom(roomCode, socket) {
    let i = 0;
    const room = await roomRepository.findOneByCode(roomCode);
    
    socket.send(JSON.stringify({
        isLast: i + 1 === room.movies.length ? true : false,
        movie: room.movies[0]
    }));

    socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        const {command, approved} = parsedMessage;

        if ("nextMovie" === command) {
            if (room.movies.length > i) {
                console.log(room.movies[i].title);
                console.log(room.movies[i].rating);

                if (approved) {
                    room.movies[i].rating++;
                }

                i++;
                socket.send(JSON.stringify({
                    isLast: i + 1 === room.movies.length ? true : false,
                    movie: room.movies[i]
                }));
            } else {
                socket.send("{}");
            }
        }

    });

    socket.on('close', () => {
        roomRepository.updateRoom(room);
        console.log('connection closed');
    })

}

module.exports = joinRoom;
