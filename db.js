const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mosca = require('mosca')
const controllers = require('./controllers/index')
const db = require('./lib/mongoDB')
const mq_client = require('./lib/mqtt')

const app = express();
const port = 4000;
const mq_settings = {
    port: 1883,
    persistence: mosca.persistence.Memory
};

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// 라우터 정보
app.use(controllers)

app.listen(port, () => console.log("Express Server Running!"));
const mq_server = new mosca.Server(mq_settings, function() {
    console.log('*** MQTT Broker Running ***');
});












// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const mosca = require('mosca')
// const mqtt = require('mqtt')
// const controllers = require('./controllers/index')
//
// const app = express();
// const port = 4000;
// const mq_client  = mqtt.connect('mqtt://localhost')
// const mq_settings = {
//     port: 1883,
//     persistence: mosca.persistence.Memory
// };
//
// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());
//
// // 라우터 정보
// app.use(controllers)
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
//
//     }
// });
//
// const dbAddress = process.env.MONGO_DB;
// mongoose.connect(dbAddress, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// })
//     .then(() => console.log("MongoDB Connected!"))
//     .catch((err) => console.log(err));
//
// app.listen(port, () => console.log("Express Server Running!"));
// const mq_server = new mosca.Server(mq_settings, function() {
//     console.log('*** MQTT Broker Running ***');
// });
