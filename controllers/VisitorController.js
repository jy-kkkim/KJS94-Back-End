const express = require('express');
const moment = require('moment');
const router = express.Router();
const Visitor = require('./../models/Visitor');

const today = new Date(moment().format("YYYY-MM-DD"));
const tMend = new Date(moment().add(1, 'M').format("YYYY-MM-DD"));
const lMstart = new Date(moment().subtract(1, 'M').format("YYYY-MM-DD"));

getDate = (value) => {
    let month = '' + (value.getMonth() + 1)
    let day = '' + value.getDate()
    const year = value.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};


// 새로운 방문자 데이터 저장
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

// 방문자 데이터 가져오기(날짜 기준 내림차순, 최근 10개 데이터)
router.get('/', function(req, res) {
    Visitor.find( {}, function(err, visitors){
        if(err) return res.status(500).send("Visitors Select Fail");
        res.status(200).send(visitors);
    }).sort({ "date": -1 }).limit(10);
});

// 이번 달
router.get('/this-month', function(req, res){
    Visitor.find({date: {$gte: today, $lt: tMend}}, function(err, data){
        let subData = new Array();
        let countData = new Array();

        data.forEach((item) => {
            subData.push(getDate(item.date));
        })

        first = subData[0];
        count = 0;
        subData.forEach((item, index) => {
            if(index == (subData.length-1)){
                count++;
                countData.push({
                    "date": subData[index-1],
                    "count": count
                })
            }
            else if(first == item) {
                count++;
            } 
            else {
                countData.push({
                    "date": subData[index-1],
                    "count": count
                })
                count = 1;
                first = subData[index];
            } 
        })

        res.send(countData);
    }).sort({ "date": 1 })
});

// 지난 달
router.get('/last-month', function(req, res){
    Visitor.find({date: {$gte: lMstart, $lt: today}}, function(err, data){
        let subData = new Array();
        let countData = new Array();

        data.forEach((item) => {
            subData.push(getDate(item.date))
        })

        first = subData[0]
        count = 0
        subData.forEach((item, index) => {
            if(index == (subData.length-1)){
                count++;
                countData.push({
                    "date": subData[index-1],
                    "count": count
                })
            }
            else if(first == item) {
                count++
            } 
            else {
                countData.push({
                    "date": subData[index-1],
                    "count": count
                })
                count = 1
                first = subData[index]
            } 
        })

        res.send(countData)
    }).sort({ "date": 1 })
});

// 오늘 날짜
router.get('/today', function(req, res) {
    Visitor.find( {date: {$gte: today } }, function(err, visitors){
        if(err) return res.status(500).send("Visitors Select Fail");
        res.status(200).send(visitors);
    }).sort({ "date": -1 }).limit(10);
});

// 사용자 지정 기간
router.get('/term/:start/:end', function(req, res) {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end)

    Visitor.find({date: {$gte: start, $lt: end}}, function(err, visitors){
        if(err) return res.status(500).send("Visitors Select Fail");
        res.status(200).send(visitors);
    })
})

module.exports = router;
