const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({  
    date: String,
    auth: String
});
mongoose.model('Visitor', VisitorSchema);

module.exports = { User }