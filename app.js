var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/property');
const appointmentRouter = require("./routes/appointment")
const passport = require("passport")
const seccion = require("express-session")
const User = require("./model/users");
const { emitWarning } = require('process');
require('dotenv').config()
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(seccion({
  saveUninitialized: true,
  resave:true,
  secret: process.env.SECRET,
}))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use('/', indexRouter);
app.use('/property', usersRouter);
app.use("/appointment", appointmentRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


require("./model/connect")
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
