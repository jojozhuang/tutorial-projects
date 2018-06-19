// ./server/server.js
var express = require("express");
var bodyParser = require("body-parser");
var mongoconfig = require("./config/mongodb-config");
var morgan = require("morgan");
var winston = require("./config/winston-config-rotate");
var question = require("./routers/question"); // Imports routes for the question
var user = require("./routers/user"); // Imports routes for the user

var port = process.env.PORT || 5000;

var app = express();
app.use(morgan("short"));

// setup the winston stream
app.use(morgan("combined", { stream: winston.stream }));

// Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = process.env.MONGODB_URI || mongoconfig.url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// routes
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get("/", function(req, res) {
  res.json({ message: "Hello! welcome to our api!" });
});

// chain routers
// all of the routers will be prefixed with /api
router.use("/question", question); // /api/question
router.use("/user", user); // /api/user

// Register the 'root' router
app.use("/api", router);

app.use(function(err, req, res, next) {
  // error level logging
  winston.error(winston.combinedFormat(err, req, res));
  winston.writeError(err);
  res.status(err.status || 500).send("Internal server error.");
});

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
