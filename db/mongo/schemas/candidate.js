const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    candidate_name: String,
    education: String,
    date_of_birth: String,
    aadhar: String,
    present: {
        party: String,
        no_of_criminal_cases: Number,
        liability: String,
        asset: String,
        constituency: String
    },
    history: [{
        party: String,
        session_attended: Number,
        no_of_sessions: Number,
        constituency: String,
        no_of_criminal_cases: Number,
        term: String,
        liability: String,
        Asset: String
    }]
});