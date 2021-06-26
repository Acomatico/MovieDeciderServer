'use strict'

const mongoose = require('mongoose');

async function connect() {
    try {
        const connection = mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        return connection;
    } catch(error) {
        throw error;
    }
}

async function disconnect() {
    mongoose.connection.close();
}

module.exports = { connect, disconnect }
