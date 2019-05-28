
var mongoose = require('mongoose');
var config = require('../globalFunctions/config')();
mongoose.Promise = global.Promise;
mongoose.connection.openUri(config.DB_URL, { useNewUrlParser: true });


/*********** Events of mongoose connection. ****************/
// CONNECTION EVENTS
// When successfully connected

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + config.DB_URL);

    mongoose.connection.db.listCollections().toArray(function (err, names, callback) {
        // console.log("names===>>>",names);       
    });

})
// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});