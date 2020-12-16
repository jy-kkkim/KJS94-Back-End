const express = require('express');
const moment = require('moment');
const router = express.Router();
const Mask = require('./../models/Mask');

const today = new Date(moment().format("YYYY-MM-DD"));
const tMend = new Date(moment().add(1, 'M').format("YYYY-MM-DD"));
const lMstart = new Date(moment().subtract(1, 'M').format("YYYY-MM-DD"));

// 새로운 마스크 미착용자 탐지 데이터 저장
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

// 마스크 미착용자 탐지 데이터 가져오기(날짜 기준 내림차순, 최근 10개 데이터)
router.get('/', function(req, res) {
    Mask.find( {}, function(err, mask){
        if(err) return res.status(500).send("Mask Select Fail");
        res.status(200).send(mask);
    }).sort({ "date": -1 }).limit(10);
});

// 가장 최근 마스크 미착용자 탐지 데이터
router.get('/one', function(req, res) {
    Mask.find( {}, function(err, mask){
        if(err) return res.status(500).send("Mask Select Fail");
        res.status(200).send(mask);
    }).sort({ "date": -1 }).limit(1);
});

// 마스크 미착용자 탐지 데이터 관리자 승인
router.put('/:id', function(req, res) {
    Mask.findById(req.params.id, function(err, mask) {
        mask.detect = 0;
        mask.save(function(err){
            if(err) res.status(500).send("Mask Update Fail");
            res.status(200).send(mask);
        })
    })
});

// 이번 달
router.get('/this-month', function(req, res){
    Mask.find({date: {$gte: today, $lt: tMend}}, function(err, data){
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

// 지난 달
router.get('/last-month', function(req, res){
    Mask.find({date: {$gte: lMstart, $lt: today}}, function(err, data){
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

// 사용자 지정 기간
router.get('/term/:start/:end', function(req, res) {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end)

    Mask.find({date: {$gte: start, $lt: end}}, function(err, mask){
        if(err) return res.status(500).send("Mask Select Fail");
        res.status(200).send(mask);
    })
})

module.exports = router;
