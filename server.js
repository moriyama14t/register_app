var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var mysql = require('mysql2');
var session = require('express-session');
var register = require('./controllers/register_controller');
var forget = require('./controllers/forget_controller');
var login = require('./controllers/login_controller');
var home = require('./controllers/home_controller');
var logout = require('./controllers/logout_controller');
var deletion = require('./controllers/delete_controller');
var edit = require('./controllers/edit_controller');
var port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'randomstringsessionsecret'}));
app.use('/', forget);
app.use('/', deletion);
app.use('/', register);
app.use('/', login);
app.use('/', home);
app.use('/', logout);
app.use('/', edit);
app.use(express.static('public'));

app.listen(port);

module.exports = app;