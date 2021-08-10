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
    active: {
        type: Boolean
    },
    movies: [movieSchema],
    voters: {
        type: Array,
        items: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
