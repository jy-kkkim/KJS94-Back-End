const mongoose = require('mongoose');
const dbAddress = process.env.MONGO_DB;

mongoose.connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));
