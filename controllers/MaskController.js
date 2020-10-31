const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Mask = require('./../models/Mask');

router.use(bodyParser.urlencoded({ extended:true }));

router.post('/', function(req, res) {
    Mask.create({
        date: req.body.date,
        detect: req.body.detect
    },
    function(err, mask){
        if(err) return res.status(500).send("Mask Create Fail");
        res.status(200).send(mask);
    });
});

router.get('/', function(req, res) {
    Mask.find( {}, function(err, mask){
        if(err) return res.status(500).send("Mask Select Fail");
        res.status(200).send(mask);
    }).sort({ "_id": -1 }).limit(10);
});

module.exports = router;
