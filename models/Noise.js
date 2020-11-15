const mongoose = require('mongoose');

const NoiseSchema = new mongoose.Schema({
    date: Date,
    noise: String
});

mongoose.model('Noise', NoiseSchema);
module.exports = mongoose.model('Noise');
