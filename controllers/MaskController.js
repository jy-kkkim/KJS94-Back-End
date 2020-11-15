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
    }).sort({ "date": -1 }).limit(10);
});

router.get('/one', function(req, res) {
    Mask.find( {}, function(err, mask){
        if(err) return res.status(500).send("Mask Select Fail");
        res.status(200).send(mask);
    }).sort({ "date": -1 }).limit(1);
});

router.put('/:id', function(req, res) {
    // Mask.findByIdAndUpdate(req.params.id, req.body, {detect22: 0}, function (err, mask) {
    //     if(err) return res.status(500).send("Mask Update Fail");
    //     res.status(200).send(mask);
    // });
    Mask.findById(req.params.id, function(err, mask) {
        mask.detect = 0;
        mask.save(function(err){
            if(err) res.status(500).send("Mask Update Fail");
            res.status(200).send(mask);
        })
    })
});

module.exports = router;
