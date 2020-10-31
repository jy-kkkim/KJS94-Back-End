const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    date: String,
    temperature: String
});

mongoose.model('Temperature', TemperatureSchema);
module.exports = mongoose.model('Temperature');
