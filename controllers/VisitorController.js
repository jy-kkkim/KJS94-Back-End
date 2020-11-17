const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');
const Visitor = require('./../models/Visitor');
let day = new Date();
let yesterday = String(day.getFullYear())+'-'+String((day.getMonth() + 1))+'-'+String((day.getDate() - 1));

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

// 통계
router.get('/count', function(req, res){
    Visitor.distinct("date", function(err, data){
        let subData = new Array();
        let countData = new Array();

        data.forEach((item) => {
            subData.push(getDate(item))
        })

        a = subData[0]
        count = 0
        subData.forEach((item, index) => {
            //console.log(subData.length-1);
            if(index == (subData.length-1)){
                count++;
                countData.push({
                    "date": subData[index-1],
                    "count": count
                })
            }
            else if(a == item) {
                count++
            } 
            else {
                countData.push({
                    "date": subData[index-1],
                    "count": count
                })
                count = 1
                a = subData[index]
            } 
        })
        

        // let result = data.map((temp) => {
        //     return temp.slice(0,10)
        // })

        res.send(countData)
        // 11/13 : 10
        // 11/14 : 11
        // 11/15 : 5
        // 11/17 : 10
    })
})

//{$regex:today}
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
