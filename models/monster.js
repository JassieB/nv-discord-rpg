const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const monsterSchema = new mongoose.Schema({
    guildID: reqString,
    messageID: reqString,
    timestamp: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = Monster = mongoose.model('Monster', monsterSchema);