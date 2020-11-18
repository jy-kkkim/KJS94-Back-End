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
    { date: new Date("2020-11-02 19:11:54"), auth: 1},
    { date: new Date("2020-11-02 19:10:52"), auth: 1},
    { date: new Date("2020-11-02 19:07:10"), auth: 1},
    { date: new Date("2020-11-02 18:20:20"), auth: 1},
    { date: new Date("2020-11-02 18:20:10"), auth: 0},
    { date: new Date("2020-11-02 18:19:54"), auth: 1},
    { date: new Date("2020-11-02 17:19:54"), auth: 1},
    { date: new Date("2020-11-02 17:13:54"), auth: 1},
    { date: new Date("2020-11-02 16:13:54"), auth: 1},
    { date: new Date("2020-11-02 16:13:21"), auth: 0},
    { date: new Date("2020-11-02 14:00:20"), auth: 1},
    { date: new Date("2020-11-02 12:22:13"), auth: 1},
    { date: new Date("2020-11-02 11:53:22"), auth: 1},
    { date: new Date("2020-11-02 11:52:50"), auth: 0},
    { date: new Date("2020-11-02 09:33:21"), auth: 1},
])