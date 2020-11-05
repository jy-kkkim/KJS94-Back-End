const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    uid: {
        type: String
    }, 
    password: {
        type: String
    },
    role: {
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

const User = mongoose.model('User', UsersSchema) 
