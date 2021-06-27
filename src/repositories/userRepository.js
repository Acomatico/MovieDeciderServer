'use strict';

const userModel = require('../models/user');

async function create(user) {
    await userModel.create(user);
}

async function findOneBy(filters) {
    return await userModel.findOne(filters)
}

module.exports = { create, findOneBy }
