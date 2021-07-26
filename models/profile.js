const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const assetsSchema = new mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    username: reqString,
    joinDate: {
        type: Date,
        default: Date.now(),
    },
    warnings: {
        type: Number,
        default: 0,
    },
})

module.exports = Assets = mongoose.model('Assets', assetsSchema);