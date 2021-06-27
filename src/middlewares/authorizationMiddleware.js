'use strict';

const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

async function authorizationMiddleware(req,res,next) {
    const {authorization} = req.headers;
    if (!authorization) return res.sendStatus(401);

    const [prefix, token] = authorization.split(' ');
    if ('Bearer' !== prefix || !token) return res.sendStatus(401);

    try {
        const jwtSecret = process.env.JWT_SECRET;
        const tokenData = jwt.verify(token, jwtSecret);

        const user = await userRepository.findOneBy({uuid: tokenData.uuid});
        if (!user) return res.sendStatus(401);
        req.claims = { user };
    } catch(error) {
        return res.sendStatus(401);
    }

    return next();
}

module.exports = authorizationMiddleware;
