'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ws = require('ws');
const {connect, disconnect} = require('./src/servers/server');
const routes = require('./src/routes/index');
const joinRoom = require('./src/controllers/rooms/joinRoom');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const wsServer = new ws.Server({ noServer: true });
wsServer.on('joinRoom', (socket, request) => {
    const roomCode = request.url.split('/')[2];
    joinRoom(roomCode, socket);

})

app.use('/api/users', routes.userRoutes);
app.use('/api/rooms', routes.roomRoutes);

async function init() {
    try {
        await connect();
    } catch(error) {
        console.log(error);
        process.exit(1);
    }

    const port = process.env.PORT || 8080;
    const server = app.listen(port, () => {
        console.log(`server running on port ${port}`);
    })

    server.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, socket => {
            const path = request.url;
            if (path.match(/^\/rooms\//)) {
                wsServer.emit('joinRoom', socket, request)
            }
        })
    })
}

init()
