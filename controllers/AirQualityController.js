const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AirQuality = require('./../models/AirQuality');

const date = new Date();
const thisMonth = ''+ (date.getMonth()+1)
const nextMonth = ''+ (date.getMonth()+2)
const lastMonth = ''+ (date.getMonth())
const thisYear = date.getFullYear()

if (thisMonth.length < 2) thisMonth = '0' + thisMonth;
if (nextMonth.length < 2) nextMonth = '0' + nextMonth;
if (lastMonth.length < 2) lastMonth = '0' + lastMonth;

const tMstart = new Date([thisYear, thisMonth].join('-'));
// 12월달인 경우
let tMend;
if (nextMonth == 13) {
    tMend = new Date([thisYear+1, "01"].join('-'));
} else {
    tMend = new Date([thisYear, nextMonth].join('-'));
}

const lMstart = new Date([thisYear, lastMonth].join('-'));
const lMend = new Date([thisYear, thisMonth].join('-'));

router.use(bodyParser.urlencoded({ extended:true}));

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

router.get('/', function(req, res) {
    AirQuality.find( {}, function(err, airquality){
        if(err) return res.status(500).send("AirQuality Select Fail");
        res.status(200).send(airquality);
    }).sort({ "_id": -1 }).limit(10);
});

// 이번 달 공기질
router.get('/this-month', function(req, res){
    AirQuality.find({date: {$gte: tMstart, $lt: tMend}}, function(err, data){
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

// 지난 달 공기질
router.get('/last-month', function(req, res){
    AirQuality.find({date: {$gte: lMstart, $lt: lMend}}, function(err, data){
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

module.exports = router;
