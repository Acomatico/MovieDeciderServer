'use strict'

const Joi = require('joi');

async function validate(payload) {
    const schema = Joi.object({
        email: Joi.string().email({}).required(),
        password: Joi.string().min(6).required()
    })

    try {
        await schema.validateAsync(payload);
    } catch(error) {
        throw error;
    }
}

module.exports = validate;
