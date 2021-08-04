const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const timeSchema = new mongoose.Schema({
    guildID: reqString,
    time: reqString,
    minutesLeft: {
        type: Number,
        default: 0,
    },
})

module.exports = Time = mongoose.model('Time', timeSchema);