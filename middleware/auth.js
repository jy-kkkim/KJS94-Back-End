const { User } = require("./../models/User");


let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저 찾기
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        // 유저가 없으면 인증x
        if (!user) return res.json({ isAuth: false, error: true})
        req.token = token;
        req.user = user;
        // 미들웨어의 다음단계를 진행할 수 있게해줌
        next()
    })
}

module.exports = { auth };