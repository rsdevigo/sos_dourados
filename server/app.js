var createError = require("http-errors");
require('dotenv').config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var problemsRouter = require("./routes/problems");
var midiasRouter = require("./routes/midia");
var passport = require("passport");
var dotenv = require('dotenv');
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var db = require('./model/db');
var User = require("./model/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    try {
      let model = new User(db);
      model.find.by.id(jwt_payload.id, function(err, results) {
        if (err) {
          return done(err, false);
        }
        if (results.length) {
          return done(null, results[0]);
        } else {
          return done(null, false);
        }
      });
    } catch (e) {
      throw e;
    }
  })
);

app.use("/api/v1/", indexRouter);
app.use("/api/v1/", usersRouter);
app.use("/api/v1/", problemsRouter);
app.use("/api/v1/", midiasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
