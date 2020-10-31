const mongoose = require('mongoose');

const HumiditySchema = new mongoose.Schema({
    date: String,
    humidity: String
});

mongoose.model('Humidity', HumiditySchema);
module.exports = mongoose.model('Humidity');
