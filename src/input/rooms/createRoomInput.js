'use strict'

const Joi = require('joi');
const movieSchema = require('../movies/movieSchema');

async function validateCreateRoom(payload) {
    const schema = Joi.object({
        code: Joi.string().required(),
        movies: Joi.array().items(movieSchema)
    });

    try {
        await schema.validateAsync(payload);
    } catch(error) {
        throw error;
    } 
}

module.exports = validateCreateRoom;
