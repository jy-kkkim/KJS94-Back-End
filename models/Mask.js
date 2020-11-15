const mongoose = require('mongoose');

const MaskSchema = new mongoose.Schema({  
    date: Date,
    detect: Number
});

mongoose.model('Mask', MaskSchema);
module.exports = mongoose.model('Mask');