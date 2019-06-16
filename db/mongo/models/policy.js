const mongoose = require('mongoose');

module.exports = mongoose.model('policies', require('../schemas').PolicySchema);