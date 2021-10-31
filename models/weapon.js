const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const weaponSchema = new mongoose.Schema({
    name: reqString,
    creator: reqString,
    price: {
        type: Number,
        required: true,
    },
    type: reqString,
    description: reqString,
    damage: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    sellLocations: [{}],
    equipped: false,
})

module.exports = Weapons = mongoose.model('Weapon', weaponSchema);