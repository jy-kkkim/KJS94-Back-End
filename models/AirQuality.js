const mongoose = require('mongoose');

const AirQualitySchema = new mongoose.Schema({
    date: String,
    airquality: String
});

mongoose.model('AirQuality', AirQualitySchema);
module.exports = mongoose.model('AirQuality');
