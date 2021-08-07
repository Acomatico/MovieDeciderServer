'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const movieSchema = new Schema({
    uuid: {
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    year: {
        type: String
    },
    genre: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    rating: {
        type: Number,
        default: 0
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {movieSchema, Movie};
