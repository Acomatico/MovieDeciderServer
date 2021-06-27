'use strict';

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const registerUserValidation = require('../../input/users/registerInput');
const userRepository = require('../../repositories/userRepository')

async function registerUser(req,res,next) {
    const data = req.body;
    try {
        await registerUserValidation(data);
    } catch(error) {
        return res.status(400).send({
            error: 'badRequest',
            message: error.message
        })
    }

    const user = await userRepository.findOneBy({email: data.email});
    if (user) {
        return res.status(400).send({
            error: 'badRequest',
            message: 'This Email already exists'
        });
    }

    const uuid = uuidv4();
    const now = new Date();
    const hashedPassword = await bcrypt.hash(data.password, 5);
    const newUser = {
        uuid,
        email: data.email,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now
    };

    await userRepository.create(newUser);

    return res.status(201).send();
}

module.exports = registerUser;
