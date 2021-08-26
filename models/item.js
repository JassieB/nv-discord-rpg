const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const itemsSchema = new mongoose.Schema({
    weapons: [{}],
    armour: [{}],
    consumables: [{}],
})

module.exports = Items = mongoose.model('Items', itemsSchema);