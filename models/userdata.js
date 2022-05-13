const mongoose = require('mongoose')
const Discord = require('discord.js')

const userDataSchema = mongoose.Schema({

    //ID

    name : String,
    userID: String,
    
    //INFO

    serverID: String,
    birth: String,
    sexe: String,
    loc: String,
    rankbg: String,

    //NUMBERS

    xp: { type : Number, default: 1},
    lb: { type : Number, default: 0},
    level: { type : Number, default: 1},
    money: { type : Number, default: 1000},
    daily: { type : Number, default: 0},
    work: { type : Number, default: 0},
})

module.exports = mongoose.model("userData", userDataSchema)

