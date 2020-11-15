const mongoose = require('mongoose');

const AirQualitySchema = new mongoose.Schema({
    date: Date,
    airquality: String
});

mongoose.model('AirQuality', AirQualitySchema);
module.exports = mongoose.model('AirQuality');
