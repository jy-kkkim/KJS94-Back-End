const mosca = require('mosca')
const mqtt = require('mqtt')
const mq_client = require('./mqtt_client')
// const client = mqtt.connect('mqtt://localhost')

const mq_settings = {
    port: 1883,
    persistence: mosca.persistence.Memory
};

const mq_server = new mosca.Server(mq_settings, function() {
    console.log('*** MQTT Broker Running ***');
});

mq_server.clientConnected = function(client) {
    console.log('client connected', client.id);
};

module.exports = mq_server
