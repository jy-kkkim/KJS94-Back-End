const express = require('express');
const router = express.Router();
const { User } = require('./../models/User');

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