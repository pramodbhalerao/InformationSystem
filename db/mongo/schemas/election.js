const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    totalSeats: Number,
    electionYear: Number,
    winningParty: String,
    seatsWon: Number,
    losingParty: String,
    winningPartyLeader: String,
    seatsaccquired: Number
})