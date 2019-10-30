var redis = require('redis');


var redisClient = redis.createClient();

redisClient.on('connect', function() {
    console.log('Conectado a Redis Server');
});

module.exports = redisClient;
