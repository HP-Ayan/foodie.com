//connect to local mongoDB database using mongoose orm lib.
//ORM => Object Relational Mapping here mongoose object will creates the
//JavaScript query to communicate with mongodb in background.
//var DB_URL=`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.HOST}:${process.env.MONGO_PORT}/medicineDB`;
const mongoose = require("mongoose");
var DB_URL = `mongodb://${process.env.HOST}:${process.env.MONGO_PORT}/foodsDB`;

module.exports = mongoose.connect(DB_URL)
    .then(() => {
        console.log(`MongoDB connected successfully`);
    })
    .catch((error) => {
        console.log('Error : ' + error);
    });

console.log(`mongoDB global connection is now working`);
