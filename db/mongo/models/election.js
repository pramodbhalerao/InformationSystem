const mongoose = require('mongoose');

module.exports = mongoose.model('electionResults', require('../schemas').ElectionSchema);