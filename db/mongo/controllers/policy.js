//const mongoose = require('mongoose');
const policyModel = require('../models/policy');

module.exports = {
    getAllPolicies: function(req, res) {
        policyModel.find({}).exec((err, policies)=>{
            if(err) return res.send(401);
            return res.send(policies);
        })
    },
    getAllPoliciesBasedOnEstablishmentDesc: function(req, res) {
        policyModel.find({}).sort({establishmentYear:-1}).exec((err, policies)=>{
            if(err) return res.send(401);
            return res.send(policies);
        })
    },
    getAllPoliciesBasedOnEstablishmentAsc: function(req, res) {
        policyModel.find({}).sort({establishmentYear: 1}).exec((err, policies)=>{
            if(err) return res.send(401);
            return res.send(policies);
        })
    }
}