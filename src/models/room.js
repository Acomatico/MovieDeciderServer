'use strict';

const mongoose = require('mongoose');
const {movieSchema} = require('./movie');

const {Schema} = mongoose;

const roomSchema = new Schema({
    uuid: {
        type: String,
        unique: true
    },
    creator: {
        type: String
    },
    code: {
        type: String,
        unique: true
    },
    movies: [movieSchema],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;