const mongoose = require('mongoose');
// const dbAddress = process.env.MONGO_DB;
const config = require('./../config/dev');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));
