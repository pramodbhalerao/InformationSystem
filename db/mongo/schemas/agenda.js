const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    category: String,
    claim: String,
    status: String,
    startDate: String,
    endDate: String,
    completionDate: String,
    claimedBy: String,
    region: String,
    party: String,
    budget: String
});