const mongoose = require('mongoose');

const MaskSchema = new mongoose.Schema({  
    date: String,
    detect: String
});

mongoose.model('Mask', MaskSchema);
module.exports = mongoose.model('Mask');