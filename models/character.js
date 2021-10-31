const mongoose = require('mongoose');
const mongo = require('../mongo.js');

const reqString = {
    type: String,
    required: true
}

const characterSchema = new mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    username: reqString,
    charName: reqString,
    charAge: reqString,
    charRace: reqString,
    characterLocation: reqString,
    health: {
        type: Number,
        default: 100,
    },
    stamina: {
        type: Number,
        default: 100,
    },
    hunger: {
        type: Number,
        default: 100,
    },
    class: {
        type: String,
        default: 'None',
    },
    coins: {
        type: Number,
        default: 300,
    },
    location: {
        type: String,
        default: 'axel streets',
    },
    // Level
    level: {
        type: Number,
        default: 1,
    },
    levelxp: {
        type: Number,
        default: 0,
    },
    // Skill Points
    skillPoints: {
        type: Number,
        default: 3,
    },
    // Attributes
    strength: {
        type: Number,
        default: 0,
    },
    intelligence: {
        type: Number,
        default: 0,
    },
    agility: {
        type: Number,
        default: 0,
    },
    speed: {
        type: Number,
        default: 0,
    },
    dexterity: {
        type: Number,
        default: 0,
    },
    charisma: {
        type: Number,
        default: 0,
    },
    magic: {
        type: Number,
        default: 0,
    },
})

module.exports = Character = mongoose.model('Character', characterSchema);