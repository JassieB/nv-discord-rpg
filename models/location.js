const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const locationsSchema = new mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    founder: reqString,
    name: reqString,
    channel: reqString,
    subLocations: [{}],
})

module.exports = Locations = mongoose.model('Locations', locationsSchema);