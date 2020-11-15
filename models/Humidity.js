const mongoose = require('mongoose');

const HumiditySchema = new mongoose.Schema({
    date: Date,
    humidity: Number
});

mongoose.model('Humidity', HumiditySchema);
module.exports = mongoose.model('Humidity');
