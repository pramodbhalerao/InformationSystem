//const mongoose = require('mongoose');
const partyModel = require('../models/party');

module.exports = {
    getPartyDetails: function(req, res) {
        partyModel.find({}).exec((err, details)=>{
            if(err) return res.send(401);
            return res.send(details);
        })
    },
    getPartyDetailsWithCandidateDetails: function(req, res) {
        partyModel.find({}).populate('candidates').exec((err, details)=>{
            if(err) return res.send(401);
            return res.send(details);
        })
    },
    getPartyDetailsWithAgendas: function(req, res) {
        partyModel.find({}).populate('agendas').exec((err, details)=>{
            if(err) return res.send(401);
            return res.send(details);
        })
    }

}