'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginInputValidation = require('../../input/users/loginInput');
const userRepository = require('../../repositories/userRepository');

async function loginUser(req,res,next) {
    const data = req.body;
    try {
        await loginInputValidation(data);
    } catch(error) {
        return res.status(400).send({
            error: 'badRequest',
            message: error.message
        })
    }

    const {email,password} = data;
    const user = await userRepository.findOneBy({email: email});

    if (!user) {
        return res.status(400).send({
            error: 'badRequest',
            message: 'Email or password are wrong'
        });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        return res.status(400).send({
            error: 'badRequest',
            message: 'Email or password are wrong'
        });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiration = process.env.JWT_EXPIRATION;
    const token = await jwt.sign({uuid: user.uuid}, jwtSecret, {expiresIn: jwtExpiration})

    return res.status(200).send({
        accessToken: token
    });
}

module.exports = loginUser;
