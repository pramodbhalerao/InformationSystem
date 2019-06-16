const candidateModel = require('../models/candidate');

module.exports = {
    getCandidateDetails: function(req, res) {
        candidateModel.find({}).exec((err, details)=>{
            if(err) return res.send(401, err);
            return res.send(details);
        })
    },
    getCandidateConstituency: function(req, res) {
        let constituency = (req.query && req.query.constituency) || 'Mumbai North';
        candidateModel.find({"present.constituency": constituency}).exec((err, details)=>{
            if(err) return res.send(401, err);
            return res.send(details);
        })
    },
    getCandidateConstituencyWithParty: function(req, res) {
        let constituency = (req.query && req.query.constituency) || 'Mumbai North';
        let party = (req.query && req.query.party) || 'BJP';
        candidateModel.find({"present.constituency": constituency, "present.party": party}).exec((err, details)=>{
            if(err) return res.send(401, err);
            return res.send(details);
        })
    }
}