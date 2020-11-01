const mosca = require('mosca')
const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost')

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

//
// const mqtt = require('mqtt')
// const mq_client = mqtt.connect('mqtt://localhost')
//
// mq_client.on('connect', function () {
//     mq_client.subscribe('user/visit');
//     mq_client.subscribe('user/mask');
//     mq_client.subscribe('user/temperature');
//     mq_client.subscribe('user/humidity');
//     mq_client.subscribe('user/noise');
//     mq_client.subscribe('user/airquality');
// });
//
// mq_client.on('message', function (topic, message) {
//     // console.log(message.toString());
//     const data = JSON.parse(message);
//
//     switch(topic){
//         case 'user/visit':
//             const visitor = new Visitor({
//                 date: data.date,
//                 auth: data.auth
//             });
//             visitor.save().then(() => console.log("Visitor Add"));
//             break;
//
//         case 'user/mask':
//             const mask = new Mask({
//                 date: data.date,
//                 detect: data.detect
//             });
//             mask.save().then(() => console.log("Mask Add"));
//             break;
//
//         case 'user/temperature':
//             const temperature = new Temperature({
//                 date: data.date,
//                 temperature: data.temperature
//             });
//             temperature.save().then(() => console.log("Temperature Add"));
//             break;
//
//         case 'user/humidity':
//             const humidity = new Humidity({
//                 date: data.date,
//                 humidity: data.humidity
//             });
//             humidity.save().then(() => console.log("Humidity Add"));
//             break;
//
//         case 'user/noise':
//             const noise = new Noise({
//                 date: data.date,
//                 noise: data.noise
//             });
//             noise.save().then(() => console.log("Noise Add"));
//             break;
//
//         case 'user/airquality':
//             const airquality = new AirQuality({
//                 date: data.date,
//                 airquality: data.airquality
//             });
//             airquality.save().then(() => console.log("AirQuality Add"));
//             break;
//     }
// });
//
// module.exports = mq_client
