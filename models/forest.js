const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const forestsSchema = new mongoose.Schema({
    guildID: reqString,
    town: reqString,
    monsters: [{}],
    animals: [{}],
})

module.exports = Forests = mongoose.model('Forests', forestsSchema);