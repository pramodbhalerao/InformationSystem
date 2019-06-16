const electionModel = require('../models/election');

module.exports = {
    getSeatsWon: function(req, res) {
        //electionModel.find
    },
    getSingleRecordSeatsWonAsc: function(req, res) {
        electionModel.find().sort ( { seatsWon : 1}).exec((err, result)=>{
            if(err) return res.send(401, err);
            return res.send(result);
        })
    },
    getSingleRecordSeatsWonDesc: function(req, res) {
        electionModel.find().sort ( { seatsWon : -1}).exec((err, result)=>{
            if(err) return res.send(401, err);
            return res.send(result);
        })
    }
}