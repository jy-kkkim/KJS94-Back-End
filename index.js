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