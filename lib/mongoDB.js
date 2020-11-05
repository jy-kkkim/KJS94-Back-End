const mongoose = require('mongoose');
// const dbAddress = process.env.MONGO_DB;
const dbAddress = 'mongodb+srv://jyKim:e8sPzP4IRbc0vDdR@cluster0.bfxjc.mongodb.net/KJS94?retryWrites=true&w=majority';

mongoose.connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));
