var mongoose = require("mongoose");
var dbURI;

if(process.env.ENV == "Test"){ dbURI = "mongodb://localhost/4square_TEST"}
else {dbURI = process.env.DATABASEDEV;}

mongoose.connect(dbURI);


var db = mongoose.connection;
db.on("error",function(errMsg){
    console.log("Error Connecting to Mongo: " + errMsg);
});

db.on("connected",function () {
    console.log('Mongoose default connection open to ' + dbURI)});

mongoose.set('debug', true);


module.exports = mongoose;