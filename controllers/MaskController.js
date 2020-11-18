const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Mask = require('./../models/Mask');

const date = new Date();
const thisMonth = ''+ (date.getMonth()+1)
const nextMonth = ''+ (date.getMonth()+2)
const lastMonth = ''+ (date.getMonth())
const thisYear = date.getFullYear()

if (thisMonth.length < 2) thisMonth = '0' + thisMonth;
if (nextMonth.length < 2) nextMonth = '0' + nextMonth;
if (lastMonth.length < 2) lastMonth = '0' + lastMonth;

const tMstart = new Date([thisYear, thisMonth].join('-'));
const tMend = new Date([thisYear, nextMonth].join('-'));

const lMstart = new Date([thisYear, lastMonth].join('-'));
const lMend = new Date([thisYear, thisMonth].join('-'));

getDate = (value) => {
    let month = '' + (value.getMonth() + 1)
    let day = '' + value.getDate()
    const year = value.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};


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

// 이번 달 마스크 미착용자
router.get('/this-month', function(req, res){
    Mask.find({date: {$gte: tMstart, $lt: tMend}}, function(err, data){
        let subData = new Array();
        let detectData = new Array();

        data.forEach((item) => {
            subData.push(getDate(item.date))
        })

        first = subData[0]
        count = 0
        subData.forEach((item, index) => {
            if(index == (subData.length-1)){
                count++;
                detectData.push({
                    "date": subData[index-1],
                    "count": count
                })
            }
            else if(first == item) {
                count++
            } 
            else {
                detectData.push({
                    "date": subData[index-1],
                    "count": count
                })
                count = 1
                first = subData[index]
            } 
        })

        res.send(detectData)
    }).sort({ "date": 1 })
});

// 지난 달 마스크 미착용자
router.get('/last-month', function(req, res){
    Mask.find({date: {$gte: lMstart, $lt: lMend}}, function(err, data){
        let subData = new Array();
        let detectData = new Array();

        data.forEach((item) => {
            subData.push(getDate(item.date))
        })

        first = subData[0]
        count = 0
        subData.forEach((item, index) => {
            if(index == (subData.length-1)){
                count++;
                detectData.push({
                    "date": subData[index-1],
                    "count": count
                })
            }
            else if(first == item) {
                count++
            } 
            else {
                detectData.push({
                    "date": subData[index-1],
                    "count": count
                })
                count = 1
                first = subData[index]
            } 
        })

        res.send(detectData)
    }).sort({ "date": 1 })
});

module.exports = router;
