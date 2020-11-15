const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({  
    date: Date,
    auth: Number
});
mongoose.model('Visitor', VisitorSchema);

module.exports = mongoose.model('Visitor');