const mongoose = require('mongoose');

module.exports = mongoose.model('partyAgenda', require('../schemas').AgendaSchema);