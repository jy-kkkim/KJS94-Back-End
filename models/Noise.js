const mongoose = require('mongoose');

const NoiseSchema = new mongoose.Schema({
    date: String,
    noise: String
});

mongoose.model('Noise', NoiseSchema);
module.exports = mongoose.model('Noise');
