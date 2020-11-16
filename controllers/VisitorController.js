const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');
const Visitor = require('./../models/Visitor');
let day = new Date();
let today = String(day.getFullYear())+'-'+String((day.getMonth() + 1))+'-'+String(day.getDate());
let yesterday = String(day.getFullYear())+'-'+String((day.getMonth() + 1))+'-'+String((day.getDate() - 1));


router.use(bodyParser.urlencoded({ extended:true}));

router.post('/', function(req, res) {
    Visitor.create({
        date: req.body.date,
        auth: req.body.auth
    },
    function(err, user){
        if(err) return res.status(500).send("Visitor Create Fail");
        res.status(200).send(user);
    });
});

router.get('/', function(req, res) {
    Visitor.find( {}, function(err, visitors){
        if(err) return res.status(500).send("Visitors Select Fail");
        res.status(200).send(visitors);
    }).sort({ "date": -1 }).limit(10);
});

router.get('/today', function(req, res) {
    Visitor.find( {date:{$regex:today} }, function(err, visitors){
        if(err) return res.status(500).send("Visitors Select Fail");
        res.status(200).send(visitors);
    }).sort({ "_id": -1 }).limit(10);
});

// 기간 테스트
router.get('/term/:start/:end', function(req, res) {
    //res.send(req.params.start + req.params.end);
    const start = new Date("2020-11-14");
    const end = new Date("2020-11-16")
    res.send(start + end)
    // Visitor.find({date: {$gte: start, $lt: end}}, function(err, visitors){
    //     if(err) return res.status(500).send("Visitors Select Fail");
    //     res.status(200).send(visitors);
    // })
})


module.exports = router;
