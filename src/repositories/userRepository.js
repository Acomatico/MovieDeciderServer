'use strict';

const userModel = require('../models/user');

async function create(user) {
    userModel.create(user);
}

async function findOneBy(filters) {
    userModel.findOne(filters)
}

module.exports = { create, findOneBy }
