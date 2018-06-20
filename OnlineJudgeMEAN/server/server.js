// ./server/server.js
var express = require("express");
var bodyParser = require("body-parser");
var mongoconfig = require("./config/mongodb-config");
var morgan = require("morgan");
var winston = require("./config/winston-config-rotate");
var question = require("./routers/question"); // Imports routes for the question
var user = require("./routers/user"); // Imports routes for the user
var authenticate = require("./routers/authenticate"); // Imports routes for the user
var cors = require("cors");

// [SH] Require Passport
var passport = require("passport");

// [SH] Bring in the data model
require("./models/db");
// [SH] Bring in the Passport config after model is defined
require("./config/passport-config");

var port = process.env.PORT || 5000;

var app = express();
app.use(morgan("short"));

// setup the winston stream
app.use(morgan("combined", { stream: winston.stream }));

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

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
router.use("/authenticate", authenticate); // /api/authenticate/login

// Register the 'root' router
//app.use("/api", router);

// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require("./routers/index");

// [SH] Use the API routes when path starts with /api
app.use("/api", routesApi);

app.use(function(err, req, res, next) {
  // error level logging
  winston.error(winston.combinedFormat(err, req, res));
  winston.writeError(err);

  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }

  //res.status(err.status || 500).send("Internal server error.");
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
