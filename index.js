const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers/index')


// Connect MongoDB
const db = require('./lib/mongoDB')

// Run MQTT Broker
const mqtt = require('./lib/mqtt')

// Run Express Server
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// 라우터 정보
app.use(controllers)
app.listen(port, () => console.log("Express Server Running!"));

// 테스트 데이터 추가
const Visitors = require('./models/Visitor');

Visitors.insertMany([
    { date: new Date("2020-11-14 20:00"), auth: 1},
    { date: new Date("2020-11-14 7:00"), auth: 1},
    { date: new Date("2020-11-14 20:00"), auth: 1},
    { date: new Date("2020-11-14 7:00"), auth: 1},
    { date: new Date("2020-11-14 20:00"), auth: 1},
    { date: new Date("2020-11-14 7:00"), auth: 1},
    { date: new Date("2020-11-14 20:00"), auth: 1},
    { date: new Date("2020-11-14 7:00"), auth: 1},
])