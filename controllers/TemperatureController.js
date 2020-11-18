const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Temperature = require('./../models/Temperature');

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


router.use(bodyParser.urlencoded({ extended:true}));

router.post('/', function(req, res) {
    Temperature.create({
        date: req.body.date,
        temperature: req.body.temperature,
    },
    function(err, temperature){
        if(err) return res.status(500).send("Temperature Create Fail");
        res.status(200).send(temperature);
    });
});

router.get('/', function(req, res) {
    Temperature.find( {}, function(err, temperature){
        if(err) return res.status(500).send("Temperature Select Fail");
        res.status(200).send(temperature);
    }).sort({ "_id": -1 }).limit(10);
});

// 이번 달 온도
router.get('/this-month', function(req, res){
    Temperature.find({date: {$gte: tMstart, $lt: tMend}}, function(err, data){
        let subData = new Array();
        let tempData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                temp: item.temperature
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
                    "temp": avg.toFixed(1)
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
                    "temp": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(tempData)
    }).sort({ "date": 1 })
});

// 지난 달 온도
router.get('/last-month', function(req, res){
    Temperature.find({date: {$gte: lMstart, $lt: lMend}}, function(err, data){
        let subData = new Array();
        let tempData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                temp: item.temperature
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
                    "temp": avg.toFixed(1)
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
                    "temp": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(tempData)
    }).sort({ "date": 1 })
});


module.exports = router;
