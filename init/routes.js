const partyController = require('../db/mongo').partyController;
const candidateController = require('../db/mongo').candidateController;
const neo4jContronller = require('../db/neo4j').neo4jController;
const agendaController = require('../db/mongo').agendaController;
const electionController = require('../db/mongo').electionController;
const feedbackController = require('../db/redis/controllers');
const policyController = require('../db/mongo').policyController;

module.exports = (app) => {
    if(partyController) {
        app.get('/partyDetails', partyController.getPartyDetails);
        app.get('/getPartyDetailsWithCandidateDetails', partyController.getPartyDetailsWithCandidateDetails);
        app.get('/getPartyDetailsWithAgendas', partyController.getPartyDetailsWithAgendas);
    }
    if(candidateController) {
        app.get('/candidateDetails', candidateController.getCandidateDetails);
        app.get('/getCandidateConstituency', candidateController.getCandidateConstituency);
        app.get('/getCandidateConstituencyWithParty', candidateController.getCandidateConstituencyWithParty);
    }   

    if(agendaController) {
        app.get('/getSpecificAgendas', agendaController.getSpecificAgendas);
        app.get('/getAllAgendas', agendaController.getAllAgendas);
        app.get('/getPartyAgendas', agendaController.getPartyAgendas);
        app.get('/getSpecificAgendasWithParty', agendaController.getSpecificAgendasWithParty);
    }

    if(neo4jContronller) {
        app.get('/getSectorWiseExpenditure', neo4jContronller.getSectorWiseExpenditure);
        app.get('/getNDPList', neo4jContronller.getNDPList);
        app.get('/getYearWiseNDPList', neo4jContronller.getYearWiseNDPList);
        app.get('/getMaxNDP', neo4jContronller.getMaxNDP);
        app.get('/getYearWiseMaxNDP', neo4jContronller.getYearWiseMaxNDP);
        app.get('/getTotalExpenditure', neo4jContronller.getTotalExpenditure);
        app.get('/getMunicipalCorporationDepartmentTotalExpenditure', neo4jContronller.getMunicipalCorporationDepartmentTotalExpenditure)
        app.get('/getExpenditureByDepartments', neo4jContronller.getExpenditureByDepartments)
    }

    if(electionController) {
        app.get('/getSingleRecordSeatsWonAsc', electionController.getSingleRecordSeatsWonAsc);
        app.get('/getSingleRecordSeatsWonDesc', electionController.getSingleRecordSeatsWonDesc);
    }

    if(feedbackController) {
        app.post('/postComment', feedbackController.postComment);
        app.post('/getComment', feedbackController.getComment);
        app.post('/giveLike', feedbackController.likeComment);
        app.post('/giveDislike', feedbackController.dislikeComment);
    }

    if(policyController) {
        app.get('/getAllPolicies', policyController.getAllPolicies);
        app.get('/getAllPoliciesBasedOnEstablishmentDesc', policyController.getAllPoliciesBasedOnEstablishmentDesc);
        app.get('/getAllPoliciesBasedOnEstablishmentAsc', policyController.getAllPoliciesBasedOnEstablishmentAsc);
    }

}