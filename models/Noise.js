const mongoose = require('mongoose');

const NoiseSchema = new mongoose.Schema({
    date: Date,
    noise: Number
});

mongoose.model('Noise', NoiseSchema);
module.exports = mongoose.model('Noise');
