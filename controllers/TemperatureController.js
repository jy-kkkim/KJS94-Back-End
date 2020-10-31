const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Temperature = require('./../models/Temperature');

router.use(bodyParser.urlencoded({ extended:true}));

router.post('/', function(req, res) {
    Temperature.create({
        date: req.body.date,
        temperature: req.body.temperature,
    },
    function(err, temperature){
        if(err) return res.status(500).send("Temperature Create Fail");
        res.status(200).send(temperature);
    });
});

router.get('/', function(req, res) {
    Temperature.find( {}, function(err, temperature){
        if(err) return res.status(500).send("Temperature Select Fail");
        res.status(200).send(temperature);
    }).sort({ "_id": -1 }).limit(10);
});

module.exports = router;
