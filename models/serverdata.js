const mongoose = require('mongoose')
const Discord = require('discord.js')

const sSchema = mongoose.Schema({
    serverID: String,
    schannel: String,
    gchannel: String,
    wchannel: String,
    bchannel: String,
    kchannel: String,
    prefix: { type : String, default: 'k!'},
})

module.exports = mongoose.model("serverData", sSchema)