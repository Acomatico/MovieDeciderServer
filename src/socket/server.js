'use strict';

const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9898);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);

    connection.on('message', (message) => {
        console.log('Received Message: ', message.utf8Data);
    })

    connection.on('close', (reasonCode, description) => {
        console.log('Client has disconnected');
    });
});
