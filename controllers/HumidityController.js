const express = require('express');
const moment = require('moment');
const router = express.Router();
const Humidity = require('./../models/Humidity');

const today = new Date(moment().format("YYYY-MM-DD"));
const tMend = new Date(moment().add(1, 'M').format("YYYY-MM-DD"));
const lMstart = new Date(moment().subtract(1, 'M').format("YYYY-MM-DD"));
const lWstart = new Date(moment().subtract(1, 'w').format("YYYY-MM-DD"));

// 새로운 습도 데이터 저장
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

// 습도 데이터 가져오기(날짜 기준 내림차순, 최근 10개 데이터)
router.get('/', function(req, res) {
    Humidity.find( {}, function(err, humidity){
        if(err) return res.status(500).send("Humidity Select Fail");
        res.status(200).send(humidity);
    }).sort({ "date": -1 }).limit(10);
});

// 최근 일주일
router.get('/last-week', function(req, res){
    Humidity.find({date: {$gte: lWstart, $lt: today}}, function(err, data){
        let subData = new Array();
        let tempData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                humidity: item.humidity
            })
        })
        
        first = subData[0];
        let sumData = new Array();
        subData.forEach((item, index) => {
            let avg = 0;
            if(index == (subData.length-1)){
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                tempData.push({
                    "date": first.date,
                    "humidity": avg.toFixed(1)
                })
            }

            if(first.date == item.date) {
                sumData.push(item.temp)
            } else {
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                tempData.push({
                    "date": first.date,
                    "humidity": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(tempData)
    }).sort({ "date": 1 })
});

// 이번 달
router.get('/this-month', function(req, res){
    Humidity.find({date: {$gte: today, $lt: tMend}}, function(err, data){
        let subData = new Array();
        let humidityData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                humidity: item.humidity
            })
        })
        
        first = subData[0];
        let sumData = new Array();
        subData.forEach((item, index) => {
            let avg = 0;
            if(index == (subData.length-1)){
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                humidityData.push({
                    "date": first.date,
                    "humidity": avg.toFixed(1)
                })
            }

            if(first.date == item.date) {
                sumData.push(item.humidity)
            } else {
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                humidityData.push({
                    "date": first.date,
                    "humidity": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(humidityData)
    }).sort({ "date": 1 })
});

// 지난 달
router.get('/last-month', function(req, res){
    Humidity.find({date: {$gte: lMstart, $lt: today}}, function(err, data){
        let subData = new Array();
        let humidityData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                humidity: item.humidity
            })
        })
        
        first = subData[0];
        let sumData = new Array();
        subData.forEach((item, index) => {
            let avg = 0;
            if(index == (subData.length-1)){
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                humidityData.push({
                    "date": first.date,
                    "humidity": avg.toFixed(1)
                })
            }

            if(first.date == item.date) {
                sumData.push(item.humidity)
            } else {
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                humidityData.push({
                    "date": first.date,
                    "humidity": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(humidityData)
    }).sort({ "date": 1 })
});

// 사용자 지정 기간
router.get('/term/:start/:end', function(req, res) {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end)

    Humidity.find({date: {$gte: start, $lt: end}}, function(err, humidity){
        if(err) return res.status(500).send("Humidity Select Fail");
        res.status(200).send(humidity);
    })
})

module.exports = router;
