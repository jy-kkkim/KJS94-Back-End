const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Noise = require('./../models/Noise');

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
    Noise.create({
        date: req.body.date,
        noise: req.body.noise,
    },
    function(err, noise){
        if(err) return res.status(500).send("Noise Create Fail");
        res.status(200).send(noise);
    });
});

router.get('/', function(req, res) {
    Noise.find( {}, function(err, noise){
        if(err) return res.status(500).send("Noise Select Fail");
        res.status(200).send(noise);
    }).sort({ "_id": -1 }).limit(10);
});

// 이번 달 소음
router.get('/this-month', function(req, res){
    Noise.find({date: {$gte: tMstart, $lt: tMend}}, function(err, data){
        let subData = new Array();
        let noiseData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                noise: item.noise
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
                noiseData.push({
                    "date": first.date,
                    "noise": avg.toFixed(1)
                })
            }

            if(first.date == item.date) {
                sumData.push(item.noise)
            } else {
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                noiseData.push({
                    "date": first.date,
                    "noise": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(noiseData)
    }).sort({ "date": 1 })
});

// 지난 달 소음
router.get('/last-month', function(req, res){
    Noise.find({date: {$gte: lMstart, $lt: lMend}}, function(err, data){
        let subData = new Array();
        let noiseData = new Array();

        data.forEach((item) => {
            subData.push({
                date: getDate(item.date),
                noise: item.noise
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
                noiseData.push({
                    "date": first.date,
                    "noise": avg.toFixed(1)
                })
            }

            if(first.date == item.date) {
                sumData.push(item.noise)
            } else {
                avg = 0;
                for(let i=0; i<sumData.length; i++){
                    avg += sumData[i];
                }
                avg = avg/sumData.length;
                noiseData.push({
                    "date": first.date,
                    "noise": avg.toFixed(1)
                })
                first = subData[index]
                
            }
        })

        res.send(noiseData)
    }).sort({ "date": 1 })
});

module.exports = router;
