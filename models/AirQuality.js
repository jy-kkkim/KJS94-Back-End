const mongoose = require('mongoose');

const AirQualitySchema = new mongoose.Schema({
    date: Date,
    airquality: Number
});

mongoose.model('AirQuality', AirQualitySchema);
module.exports = mongoose.model('AirQuality');
