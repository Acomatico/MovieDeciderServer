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
        type: string
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

const Movie = mongoose.model('Movie', userSchema);

module.exports = {movieSchema, Movie};
