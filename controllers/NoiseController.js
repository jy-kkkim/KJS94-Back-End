const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Noise = require('./../models/Noise');

router.use(bodyParser.urlencoded({ extended:true}));

router.post('/', function(req, res) {
    Noise.create({
        date: req.body.date,
        noise: req.body.noise,
    },
    function(err, noise){
        if(err) return res.status(500).send("Noise Create Fail");
        res.status(200).send(noise);
    });
});

router.get('/', function(req, res) {
    Noise.find( {}, function(err, noise){
        if(err) return res.status(500).send("Noise Select Fail");
        res.status(200).send(noise);
    }).sort({ "_id": -1 }).limit(10);
});

module.exports = router;
