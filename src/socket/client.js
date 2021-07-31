'use strict';

const ws = new WebSocket('ws://localhost:9898/');

ws.onopen = () => {
    console.log('Client connected lads');
    ws.send('DEADLY COMMANDOS');
};

ws.onmessage = (message) => {
    console.log(`Client received ${message.data}`);
};
