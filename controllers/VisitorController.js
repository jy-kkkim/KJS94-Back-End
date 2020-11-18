const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Visitor = require('./../models/Visitor');

const date = new Date();
const thisMonth = ''+ (date.getMonth()+1)
const lastMonth = ''+ (date.getMonth()+2)
const thisYear = date.getFullYear()

if (thisMonth.length < 2) thisMonth = '0' + thisMonth;
if (lastMonth.length < 2) lastMonth = '0' + lastMonth;

const tMstart = new Date([thisYear, thisMonth].join('-'));
const tMend = new Date([thisYear, lastMonth].join('-'));

getDate = (value) => {
    let month = '' + (value.getMonth() + 1)
    let day = '' + value.getDate()
    const year = value.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};


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

// 이번 달 방문자
router.get('/this-month', function(req, res){
    Visitor.find({date: {$gte: tMstart, $lt: tMend}}, function(err, data){
    // Visitor.distinct("date", function(err, data){
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
    })
})

// 오늘 날짜
router.get('/today', function(req, res) {
    Visitor.find( {date: {$gte: getDate(new Date()) } }, function(err, visitors){
        if(err) return res.status(500).send("Visitors Select Fail");
        res.status(200).send(visitors);
    }).sort({ "_id": -1 }).limit(10);
});

// 기간 테스트
///term/:start/:end
router.get('/term', function(req, res) {
    //res.send(req.params.start + req.params.end);
    const start = new Date("2020-11-13");
    const end = new Date("2020-11-14")

    Visitor.find({date: {$gte: start, $lt: end}}, function(err, visitors){
        if(err) return res.status(500).send("Visitors Select Fail");
        res.status(200).send(visitors);
    })
})

// 11/13일 데이터만 나옴
// router.get('/term', function(req, res) {
//     //res.send(req.params.start + req.params.end);
//     const start = new Date("2020-11-13");
//     const end = new Date("2020-11-14")

//     Visitor.find({date: {$gte: start, $lt: end}}, function(err, visitors){
//         if(err) return res.status(500).send("Visitors Select Fail");
//         res.status(200).send(visitors);
//     })
// })


module.exports = router;
