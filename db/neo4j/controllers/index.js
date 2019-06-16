const session = require('../../connect/neo4j');

module.exports = {
    getSectorWiseExpenditure: function(req, res) {
        session.run(
            `MATCH (a:MunicipalCorporation {name : "BrihinMumbai Municipal Corporation (BMC)"})-[r:SPENDS_ON {duration:"2017-2018"}]->(b)
            RETURN b.name as Sector,r.budgetEstimates as BudgetEstimates, r.revisedEstimates as RevisedEstimates, r.actuals as ActualBudget`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push(records[i].get(0));
                }
                return res.send(data);
            } else return res.send(404);
        })
    },
    getMunicipalCorporationDepartmentTotalExpenditure: function(req, res) {
        session.run(
            `MATCH (bmc:MunicipalCorporation {name : "BrihinMumbai Municipal Corporation (BMC)"}) -[r:SPENDS_ON]-> (g:GeneralEducation)
            RETURN r.budgetEstimates as BudgetEstimates, r.revisedEstimates as RevisedEstimates, r.actuals as ActualBudget, r.duration as Duration`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push(records[i].get(0));
                }
                return res.send(data);
            } else return res.send(404);
        })
    },
    getExpenditureByDepartments: function(req, res) {
        session.run(
            `MATCH (a:GeneralEducation)-[r:SPENDS_ON ]->(b)
            RETURN b.name as Department,r.budgetEstimates as BudgetEstimates, r.revisedEstimates as RevisedEstimates, r.actuals as ActualBudget, r.duration as Duration`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push(records[i].get(0));
                }
                return res.send(data);
            } else return res.send(404);
        })
    },
    getTotalExpenditure: function(req, res){
        session.run(
            `MATCH (bmc:MunicipalCorporation {name : "BrihinMumbai Municipal Corporation (BMC)"}) -[r:SPENDS_ON {duration: "2017-2018"}]-> (b)
            RETURN SUM(r.actuals) as TotalExpenditure`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push(records[i].get(0));
                }
                return res.send(data);
            } else return res.send(404);
        })
    },
    getNDPList: function(req, res) {
        let orderBy = (req.query && req.query.orderBy) || 'DESC';
        session.run(
            `MATCH ((c:Country)-[h:HAVE_A_STATE]-(s:State))
            WHERE h.duration="2011-2012"
            RETURN s.name, h.ndp, h.duration
            ORDER BY h.ndp ${orderBy}
            LIMIT 20;`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push({
                        state: records[i].get(0),
                        ndp: records[i].get(1),
                        duration: records[i].get(2)
                    });
                }
                return res.send(data);
            } else return res.send(404);
        })
    },
    getYearWiseNDPList: function(req, res) {
        let orderBy = (req.query && req.query.orderBy) || 'DESC';
        session.run(
            `MATCH ((c:Country)-[h:HAVE_A_STATE]-(s:State))
            WHERE h.duration="2011-2012"
            RETURN s.name, h.ndp, h.duration
            ORDER BY h.ndp ${orderBy}
            LIMIT 20;`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push({
                        name: records[i].get(0),
                        ndp: records[i].get(1),
                        duration: records[i].get(2)
                    });
                }
                return res.send(data);
            } else return res.send(404);
        })
    },
    getMaxNDP: function(req, res) {
        session.run(
            `MATCH ((c:Country)-[h:HAVE_A_STATE]-(s:State))
            WITH max(h.ndp) AS Max_NDP
            MATCH ((c:Country)-[h:HAVE_A_STATE]-(s:State))
            WHERE h.ndp = Max_NDP
            Return s.name, h.duration, h.ndp;`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push({
                        name: records[i].get(0),
                        duration: records[i].get(1),
                        ndp: records[i].get(2)
                    });
                }
                return res.send(data);
            } else return res.send(404);
        })
    },
    getYearWiseMaxNDP: function(req, res) {
        let duration = (req.query && req.query.duration) || '2012-2013';
        session.run(
            `MATCH ((c:Country)-[h:HAVE_A_STATE]-(s:State))
            WHERE h.duration = ${duration}
            WITH max(h.ndp) AS Max_NDP
            MATCH ((c:Country)-[h:HAVE_A_STATE]-(s:State))
            WHERE h.ndp = Max_NDP
            Return s.name, h.duration, h.ndp;`
        ).then(result=>{
            if(result && result.records && result.records.length>0) {
                let records = result.records;
                let data = [];
                for(let i=0;i<records.length;i++) {
                    data.push({
                        name: records[i].get(0),
                        duration: records[i].get(1),
                        ndp: records[i].get(2)
                    });
                }
                return res.send(data);
            } else return res.send(404);
        })
    }
}