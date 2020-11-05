const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { User } = require('./../models/User');

// application/x-www-form-urlencoded 형식의 데이터를 분석해서 가져온다.
router.use(bodyParser.urlencoded({ extended:true}));

// application/json 형식의 데이터를 분석해서 가져온다.
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져와서 DB에 넣어줌
    const user = new User(req.body)
    // save전에 암호화가 이루어짐. model 저장시 Bcrypt를 이용해서 암호화됨 (/models/User).
    user.save((err, userInfo) => {
        if (err) return res.status(500).json({ success: false, err});
        res.status(200).json({
            success: true
        })
    })
})

module.exports = router;