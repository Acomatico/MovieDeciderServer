'use strict';

const Joi = require('joi');

function movieSchema() {
    const schema = Joi.object({
        title: Joi.string().required(),
        genre: Joi.string(),
        year: Joi.number()
    })

    return schema;
}

module.exports = movieSchema;
