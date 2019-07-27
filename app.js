var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true},(err,result)=>{
  if(err) return console.log("Error Occured========>",err);
  console.log("Database Connected");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
