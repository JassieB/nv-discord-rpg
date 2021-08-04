const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const settingsSchema = new mongoose.Schema({
    guildID: reqString,
    mods: [{}],
    timeActive: {
        type: Boolean,
        default: true,
    },
    commandsActive: {
        type: Boolean,
        default: true,
    },
    logsActive: {
        type: Boolean,
        default: true,
    },
    spawningActive: {
        type: Boolean,
        default: true,
    }
})

module.exports = Settings = mongoose.model('Settings', settingsSchema);