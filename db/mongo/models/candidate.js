const mongoose = require('mongoose');

module.exports = mongoose.model('candidate', require('../schemas').CandidateSchema);

