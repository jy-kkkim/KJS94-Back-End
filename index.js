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

// Visitors.insertMany([
//     { date: new Date("2020-10-22 19:11:54"), auth: 1},
//     { date: new Date("2020-10-22 19:10:52"), auth: 1},
//     { date: new Date("2020-10-22 19:07:10"), auth: 1},
//     { date: new Date("2020-10-22 18:20:20"), auth: 1},
//     { date: new Date("2020-10-22 18:20:10"), auth: 0},
//     { date: new Date("2020-10-22 18:19:54"), auth: 1},
//     { date: new Date("2020-10-22 17:19:54"), auth: 1},
//     { date: new Date("2020-10-22 17:13:54"), auth: 1},
//     { date: new Date("2020-10-22 16:13:54"), auth: 1},
//     { date: new Date("2020-10-22 23:13:21"), auth: 0},
//     { date: new Date("2020-10-22 19:23:54"), auth: 1},
//     { date: new Date("2020-10-22 19:10:52"), auth: 1},
//     { date: new Date("2020-10-23 19:07:10"), auth: 1},
//     { date: new Date("2020-10-23 18:20:20"), auth: 1},
//     { date: new Date("2020-10-23 18:20:10"), auth: 0},
//     { date: new Date("2020-10-23 18:19:54"), auth: 1},
//     { date: new Date("2020-10-23 17:19:54"), auth: 1},
//     { date: new Date("2020-10-23 17:13:54"), auth: 1},
//     { date: new Date("2020-10-23 23:13:54"), auth: 1},
//     { date: new Date("2020-10-23 16:13:21"), auth: 0},
//     { date: new Date("2020-10-23 14:00:20"), auth: 1},
//     { date: new Date("2020-10-23 14:22:13"), auth: 1},
//     { date: new Date("2020-10-23 11:53:22"), auth: 1},
//     { date: new Date("2020-10-24 11:52:50"), auth: 0},
//     { date: new Date("2020-10-24 09:33:21"), auth: 1},
//     { date: new Date("2020-10-30 19:11:54"), auth: 1},
//     { date: new Date("2020-10-24 19:10:52"), auth: 1},
//     { date: new Date("2020-10-24 19:07:10"), auth: 1},
//     { date: new Date("2020-10-24 18:20:20"), auth: 1},
//     { date: new Date("2020-10-24 18:20:10"), auth: 0},
//     { date: new Date("2020-10-24 18:19:54"), auth: 1},
//     { date: new Date("2020-10-25 17:19:54"), auth: 1},
//     { date: new Date("2020-10-25 17:25:54"), auth: 1},
//     { date: new Date("2020-10-30 16:30:54"), auth: 1},
//     { date: new Date("2020-10-25 19:10:52"), auth: 1},
//     { date: new Date("2020-10-25 19:19:10"), auth: 1},
//     { date: new Date("2020-10-26 18:20:20"), auth: 1},
//     { date: new Date("2020-10-26 18:20:10"), auth: 0},
//     { date: new Date("2020-10-26 18:26:54"), auth: 1},
//     { date: new Date("2020-10-26 17:26:54"), auth: 1},
//     { date: new Date("2020-10-26 17:13:54"), auth: 1},
//     { date: new Date("2020-10-26 16:13:54"), auth: 1},
//     { date: new Date("2020-10-26 16:13:27"), auth: 0},
//     { date: new Date("2020-10-20 17:13:54"), auth: 1},
//     { date: new Date("2020-10-20 16:13:54"), auth: 1},
//     { date: new Date("2020-10-20 16:13:27"), auth: 0},
//     { date: new Date("2020-10-27 19:10:52"), auth: 1},
//     { date: new Date("2020-10-27 19:14:10"), auth: 1},
//     { date: new Date("2020-10-27 18:20:20"), auth: 1},
//     { date: new Date("2020-10-27 18:20:10"), auth: 0},
//     { date: new Date("2020-10-27 18:19:54"), auth: 1},
//     { date: new Date("2020-10-27 17:19:54"), auth: 1},
//     { date: new Date("2020-10-27 17:13:54"), auth: 1},
//     { date: new Date("2020-10-27 16:13:54"), auth: 1}
// ])