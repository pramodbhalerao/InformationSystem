const neo4j = require('neo4j-driver').v1;

const uri = "bolt://hobby-lgbibmpcakdogbkeakppeecl.dbs.graphenedb.com:24787";
const user = "knowyourcandidate";
const password = "b.5YdPH9JWpa2a.4reWPAv29JZWJsGp";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

console.log('neo4j connection called');

module.exports =  driver.session();