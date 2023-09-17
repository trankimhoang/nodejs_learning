var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const expressLayouts = require('express-ejs-layouts')

const systemConfig = require('./configs/system');

//connect mongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nodejs_learning:kimhoang123@cluster0.ziooixp.mongodb.net/project_nodejs', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', () => {
    console.log('connection error')
});
db.once('open', () => {
    // console.log('connected');

    // var itemTest = new itemModel({name: "HoangNek", status: "0", odering: "1"});

    // await itemTest.save();


    // const data = await itemModel.find();

    // console.log(data);
});








// itemModel.find({ }, function(err, items){
    
// });

//   const Kitten = mongoose.model('Kitten', kittySchema);

// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "nodejs"
//   });

// con.connect(function(err) {
// if (err) throw err;
// console.log("Connected!!!")
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.set('layout', 'admin')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//setup variable
app.locals.systemConfig = systemConfig;

//setup router
app.use(`/${systemConfig.prefixAdmin}`, require('./routes/admin/index'));
app.use('/', require('./routes/web/index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', { pageTitle:'ErrorPage' });
});

module.exports = app;
