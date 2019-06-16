const agendaModel = require('../models/agenda');

module.exports = {
    getAllAgendas: function(req, res) {
        agendaModel.find({}).exec((err, result)=>{
            if(err) return res.send(404);
            return res.send(result);
        })
    },
    getSpecificAgendas: function(req, res) {
        let agenda = (req.query && req.query.agenda) || 'Tourism';
        agendaModel.find({
            "category": agenda
        }).exec((err, result)=>{
            if(err) return res.send(404);
            return res.send(result);
        }) 
    },
    getPartyAgendas: function(req, res) {
        let party = (req.query && req.query.party) || 'BJP';
        agendaModel.find({
            "party": party
        }).exec((err, result)=>{
            if(err) return res.send(404);
            return res.send(result);
        }) 
    },
    getSpecificAgendasWithParty: function(req, res) {
        let party = (req.query && req.query.party) || 'BJP';
        let agenda = (req.query && req.query.agenda) || 'Tourism';
        agendaModel.find({
            "party": party,
            "category": agenda
        }).exec((err, result)=>{
            if(err) return res.send(404);
            return res.send(result);
        })
    }
}