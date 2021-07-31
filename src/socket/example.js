'use strict'

const net = require('net');

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(data.toString())
    })

    socket.write('SERVER: ALLO COMMANDOS');
    socket.end('SERVER CLOSING');
}).on('error', (error) => {
    console.error(error);
})

server.listen(9898, () => {
    console.log('opened socket server on ', server.address().port)
})