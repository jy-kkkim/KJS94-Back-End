const express = require('express');
const moment = require('moment');
const router = express.Router();
const AirQuality = require('./../models/AirQuality');

const today = new Date(moment().format("YYYY-MM-DD"));
const tMend = new Date(moment().add(1, 'M').format("YYYY-MM-DD"));
const lMstart = new Date(moment().subtract(1, 'M').format("YYYY-MM-DD"));
const lWstart = new Date(moment().subtract(1, 'w').format("YYYY-MM-DD"));

getDate = (value) => {
    let month = '' + (value.getMonth() + 1)
    let day = '' + value.getDate()
    const year = value.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};


// 새로운 공기질 데이터 저장
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

// 공기질 데이터 가져오기(날짜 기준 내림차순, 최근 10개 데이터)
router.get('/', function(req, res) {
    AirQuality.find( {}, function(err, airquality){
        if(err) return res.status(500).send("AirQuality Select Fail");
        res.status(200).send(airquality);
    }).sort({ "date": -1 }).limit(10);
});

// 최근 일주일
router.get('/last-week', function(req, res){
    AirQuality.find({date: {$gte: lWstart, $lt: today}}, function(err, data){
        let subData = new Array();
        let tempData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                airquality: item.airquality
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
                    "airquality": avg.toFixed(1)
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
                    "airquality": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(tempData)
    }).sort({ "date": 1 })
});

// 이번 달
router.get('/this-month', function(req, res){
    AirQuality.find({date: {$gte: today, $lt: tMend}}, function(err, data){
        let subData = new Array();
        let airData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                airquality: Number(item.airquality)
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
                airData.push({
                    "date": first.date,
                    "airquality": avg.toFixed(1)
                })
            }

            if(first.date == item.date) {
                sumData.push(item.airquality)
            } else {
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                airData.push({
                    "date": first.date,
                    "airquality": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(airData)
    }).sort({ "date": 1 })
});

// 지난 달
router.get('/last-month', function(req, res){
    AirQuality.find({date: {$gte: lMstart, $lt: today}}, function(err, data){
        let subData = new Array();
        let airData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                airquality: Number(item.airquality)
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
                airData.push({
                    "date": first.date,
                    "airquality": avg.toFixed(1)
                })
            }

            if(first.date == item.date) {
                sumData.push(item.airquality)
            } else {
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                airData.push({
                    "date": first.date,
                    "airquality": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(airData)
    }).sort({ "date": 1 })
});

// 사용자 지정 기간
router.get('/term/:start/:end', function(req, res) {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end)

    AirQuality.find({date: {$gte: start, $lt: end}}, function(err, air){
        if(err) return res.status(500).send("AirQuality Select Fail");
        res.status(200).send(air);
    })
})

module.exports = router;
