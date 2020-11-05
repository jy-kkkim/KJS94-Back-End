const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./../models/User');
const { auth } = require('./../middleware/auth');

// application/x-www-form-urlencoded 형식의 데이터를 분석해서 가져온다.
router.use(bodyParser.urlencoded({ extended:true}));

// application/json 형식의 데이터를 분석해서 가져온다.
router.use(bodyParser.json());

// 쿠키 파서 사용
router.use(cookieParser());

router.post('/', (req, res) => {
    // 요청된 아이디를 데이터베이스에 있는지 찾기
    User.findOne({ uid: req.body.uid }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "없는 아이디입니다."
            })
        }

        // 요청된 이메일이 데이터베이스에 있으면 비밀번호가 일치하는지 확인
        // User model에서 메서드를 사용
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 일치하지 않습니다."})
            
                // 비밀번호가 맞다면 토큰 생성
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    // 토큰을 쿠키에 저장한다. 쿠키, 로컬스토리지, 세션 중 선택한다.
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id})
                })
        })
    })
})

// 로그인 인증
// auth 미들웨어 생성 -> /middleware/auth
router.get('/auth', auth, (req, res) => {
    // Authentication 이 True
    res.status(200).json({
        _id: req.user._id,
        // isAdmin: req.user.role === 0 ? true : false,
        isAuth: true,
        uid: req.user.uid,
        name: req.user.name
    })
})


// 로그아웃시 데이터베이스에서 토큰 삭제
router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})



module.exports = router;