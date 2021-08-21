const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const inventorySchema = new mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    username: reqString,
    charName: reqString,
    items: [{}],
    equipment: {
        type: Object,
        leftHand: 'None',
        rightHand: 'None',
        fullBodyArmor: 'None',
        headArmor: 'None',
        chestArmor: 'None',
        legArmor: 'None',
        upperBodyWear: 'Rags',
        legwear: 'Rags',
        shoes: 'Worn Out Sneakers',
    },
    currentWeight: {
        type: Number,
        default: 0.0,
    },
    maxWeight: {
        type: Number,
    }
})

module.exports = Inventory = mongoose.model('Inventory', inventorySchema);