'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {connect, disconnect} = require('./server');
const routes = require('./src/routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', routes.userRoutes);
app.use('/api/rooms', routes.roomRoutes);

async function init() {
    try {
        await connect();
    } catch(error) {
        console.log(error);
        process.exit(1);
    }

    const port = process.env.port || 5000;
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    })
}

init()
