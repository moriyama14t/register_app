var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var session = require('express-session');
var validator = require('express-validator');
var port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'randomstringsessionsecret'}));
app.use(require('./controllers/forget_controller'));
app.use(require('./controllers/delete_controller'));
app.use(require('./controllers/register_controller'));
app.use(require('./controllers/login_controller'));
app.use(require('./controllers/home_controller'));
app.use(require('./controllers/logout_controller'));
app.use(require('./controllers/edit_controller'));
app.use(express.static('public'));

app.listen(port);

module.exports = app;