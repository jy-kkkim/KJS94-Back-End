const mongoose = require('mongoose');
// 암호화 라이브러리
const bcrypt = require('bcrypt');
// 암호화에 이용되는 salt의 개수 지정
const saltRounds = 10
// 웹토큰 생성 라이브러리
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
    uid: {
        type: String
    }, 
    password: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        // 0이면 정상, 1이면 정지된 사용자
        type: String,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// user.save 하기 전에 실행됨
UsersSchema.pre('save', function (next) {
    var user = this;
    // 패스워드가 아닌 정보를 수정할 때 실행되지 않게 하기위함
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            // 암호화된 비밀번호를 password에 저장
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// cb = callback function
UsersSchema.methods.comparePassword = function(plainPassword, cb) {
    // 입력된 암호를 암호화한것과 데이터베이스에 저장된 비밀번호 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

// 토큰 생성
UsersSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해 token생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, User) {
        if(err) return cb(err)
        cb(null, user)
    })
}

// 토큰을 복호화해 사용자 _id 찾기
UsersSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해 유저 찾기
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}



const User = mongoose.model('User', UsersSchema) 

module.exports = { User }