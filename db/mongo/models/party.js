const mongoose = require('mongoose');

module.exports = mongoose.model('partydetails', require('../schemas').PartySchema);