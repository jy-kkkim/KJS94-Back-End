const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    date: Date,
    temperature: Number
});

mongoose.model('Temperature', TemperatureSchema);
module.exports = mongoose.model('Temperature');
