'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    uuid: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
