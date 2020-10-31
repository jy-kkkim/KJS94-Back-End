const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Humidity = require('./../models/Humidity');

router.use(bodyParser.urlencoded({ extended:true}));

router.post('/', function(req, res) {
    Humidity.create({
        date: req.body.date,
        humidity: req.body.humidity,
    },
    function(err, humidity){
        if(err) return res.status(500).send("Humidity Create Fail");
        res.status(200).send(humidity);
    });
});

router.get('/', function(req, res) {
    Humidity.find( {}, function(err, humidity){
        if(err) return res.status(500).send("Humidity Select Fail");
        res.status(200).send(humidity);
    }).sort({ "_id": -1 }).limit(10);
});

module.exports = router;
