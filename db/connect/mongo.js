const mongoose = require('mongoose');
const loadModels = require('../mongo/models');

module.exports = () => {
    const connect = () => {
        let url = 'mongodb://root:root@cluster0-shard-00-00-a7oxi.mongodb.net:27017,cluster0-shard-00-01-a7oxi.mongodb.net:27017,cluster0-shard-00-02-a7oxi.mongodb.net:27017/know_your_candidate?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
        mongoose.Promise = require('bluebird');
        mongoose.connect(url, err=>{
            if (err) {
                console.log(`===>  Error connecting to ${url}`);
                console.log(`Reason: ${err}`);
              } else {
                console.log(`===>  Succeeded in connecting to ${url}`);
              }
        })
    }
    connect();
    loadModels();
    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);
}