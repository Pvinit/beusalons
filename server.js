
let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    helmet = require("helmet"),
    config = require("./globalFunctions/config")(),
    https = require('https');

let connectWithDatabase = require("./dbConnection/dao")



https.createServer(app).listen(config.port);

var server = app.listen(config.PORT, function () {
    var port = server.address().port;
    console.info('\n\n\nServer is listening at PORT :', port);
});


app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// use morgan to log requests to the console
app.use(morgan("dev"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , authToken");
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use("/api", require("./api/routes/userRoutes"));