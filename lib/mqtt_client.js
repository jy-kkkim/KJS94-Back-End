const mqtt = require('mqtt');
const moment = require('moment');
const mq_client  = mqtt.connect('mqtt://localhost');

// models 불러오기
const Visitor = require('./../models/Visitor');
const Mask = require('./../models/Mask');
const Temperature = require('./../models/Temperature');
const Humidity = require('./../models/Humidity');


mq_client.on('connect', function () {
    mq_client.subscribe('user/visit');
    mq_client.subscribe('user/mask');
    mq_client.subscribe('room/temperature');
    mq_client.subscribe('room/humidity');
    mq_client.subscribe('room/noise');
    mq_client.subscribe('room/airquality');
});

mq_client.on('message', function (topic, message) {
    // console.log(message.toString());
    const data = JSON.parse(message);

    switch(topic){
        case 'user/visit':
            const visitor = new Visitor({
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                auth: data.auth
            });
            visitor.save().then(() => console.log("Visitor Add"));
            break;

        case 'user/mask':
            const mask = new Mask({
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                detect: data.detect
            });
            mask.save().then(() => console.log("Mask Add"));
            break;

        case 'room/temperature':
            const temperature = new Temperature({
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                temperature: data.temperature
            });
            temperature.save().then(() => console.log("Temperature Add"));
            break;

        case 'room/humidity':
            const humidity = new Humidity({
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                humidity: data.humidity
            });
            humidity.save().then(() => console.log("Humidity Add"));
            break;

        case 'room/noise':
            const noise = new Noise({
                date: data.date,
                noise: data.noise
            });
            noise.save().then(() => console.log("Noise Add"));
            break;

        case 'room/airquality':
            const airquality = new AirQuality({
                date: data.date,
                airquality: data.airquality
            });
            airquality.save().then(() => console.log("AirQuality Add"));
            break;
    }
});

module.exports = mq_client
