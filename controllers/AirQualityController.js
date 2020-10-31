const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AirQuality = require('./../models/AirQuality');

router.use(bodyParser.urlencoded({ extended:true}));

router.post('/', function(req, res) {
    AirQuality.create({
        date: req.body.date,
        airquality: req.body.airquality,
    },
    function(err, airquality){
        if(err) return res.status(500).send("AirQuality Create Fail");
        res.status(200).send(airquality);
    });
});

router.get('/', function(req, res) {
    AirQuality.find( {}, function(err, airquality){
        if(err) return res.status(500).send("AirQuality Select Fail");
        res.status(200).send(airquality);
    }).sort({ "_id": -1 }).limit(10);
});

module.exports = router;
