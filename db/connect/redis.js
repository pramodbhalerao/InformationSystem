const redis = require('redis');

module.exports = redis.createClient(require('./redisConfig'));
