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
// const Visitors = require('./models/Visitor');
const Mask = require('./models/Mask')

Mask.insertMany([
    { date: new Date("2020-10-29 19:11:54"), detect: 1},
    { date: new Date("2020-10-29 19:10:52"), detect: 1},
    { date: new Date("2020-10-29 19:07:10"), detect: 1},
    { date: new Date("2020-10-29 18:20:20"), detect: 1},
    { date: new Date("2020-10-29 18:20:10"), detect: 0},
    { date: new Date("2020-10-29 18:19:54"), detect: 1},
    { date: new Date("2020-10-29 17:19:54"), detect: 1},
    { date: new Date("2020-10-29 17:13:54"), detect: 1},
    { date: new Date("2020-10-29 16:13:54"), detect: 1},
    { date: new Date("2020-10-29 23:13:21"), detect: 0},
    { date: new Date("2020-10-29 19:23:54"), detect: 1},
    { date: new Date("2020-10-29 19:10:52"), detect: 1},
    { date: new Date("2020-10-31 19:07:10"), detect: 1},
    { date: new Date("2020-10-31 18:20:20"), detect: 1},
    { date: new Date("2020-10-31 18:20:10"), detect: 0},
    { date: new Date("2020-10-31 18:19:54"), detect: 1},
    { date: new Date("2020-10-31 17:19:54"), detect: 1},
    { date: new Date("2020-10-31 17:13:54"), detect: 1},
    { date: new Date("2020-10-31 23:13:54"), detect: 1},
    { date: new Date("2020-10-31 16:13:21"), detect: 0},
    { date: new Date("2020-10-31 14:00:20"), detect: 1},
    { date: new Date("2020-10-31 14:22:13"), detect: 1},
    { date: new Date("2020-10-31 11:53:22"), detect: 1},
    // { date: new Date("2020-10-17 11:52:50"), detect: 0},
    // { date: new Date("2020-10-17 09:33:21"), detect: 1},
    // { date: new Date("2020-10-17 19:10:52"), detect: 1},
    // { date: new Date("2020-10-17 19:07:10"), detect: 1},
    // { date: new Date("2020-10-17 18:20:20"), detect: 1},
    // { date: new Date("2020-10-17 18:20:10"), detect: 0},
    // { date: new Date("2020-10-17 18:19:54"), detect: 1},
    // { date: new Date("2020-10-18 17:19:54"), detect: 1},
    // { date: new Date("2020-10-18 17:25:54"), detect: 1},
    // { date: new Date("2020-10-18 19:10:52"), detect: 1},
    // { date: new Date("2020-10-18 19:19:10"), detect: 1},
    // { date: new Date("2020-10-19 18:20:20"), detect: 1},
    // { date: new Date("2020-10-19 18:20:10"), detect: 0},
    // { date: new Date("2020-10-19 18:26:54"), detect: 1},
    // { date: new Date("2020-10-19 17:26:54"), detect: 1},
    // { date: new Date("2020-10-19 17:13:54"), detect: 1},
    // { date: new Date("2020-10-19 16:13:54"), detect: 1},
    // { date: new Date("2020-10-19 16:13:27"), detect: 0},
    // { date: new Date("2020-10-21 17:13:54"), detect: 1},
    // { date: new Date("2020-10-21 16:13:54"), detect: 1},
    // { date: new Date("2020-10-21 16:13:27"), detect: 0},
    // { date: new Date("2020-10-21 19:10:52"), detect: 1},
    // { date: new Date("2020-10-21 19:14:10"), detect: 1},
    // { date: new Date("2020-10-28 19:10:52"), detect: 1},
    // { date: new Date("2020-10-28 19:14:10"), detect: 1},
    // { date: new Date("2020-10-28 18:20:20"), detect: 1},
    // { date: new Date("2020-10-28 18:20:10"), detect: 0},
    // { date: new Date("2020-10-28 18:19:54"), detect: 1},
    // { date: new Date("2020-10-28 17:19:54"), detect: 1},
    // { date: new Date("2020-10-28 17:13:54"), detect: 1},
    // { date: new Date("2020-10-28 16:13:54"), detect: 1}
])