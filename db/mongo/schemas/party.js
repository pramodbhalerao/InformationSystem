const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    name: String,
    establishmentYear: String,
    founder: String,
    partyAbbrevation: String,
    headquarters: String,
    mainLeaders: [String],
    agendas: [{ type: mongoose.Schema.Types.ObjectId, ref: mongoose.model('partyagendas', require('./agenda')) }],
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: mongoose.model('candidates', require('./candidate')) }]
});
