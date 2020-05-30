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
app.use(bodyParser.json());//body-parser による JSON データの読み込み
app.use(bodyParser.urlencoded({extended: false}));//メディアタイプがapplication/x-www-form-urlencoded
//のデータをパースするためにquerystringモジュールを使用するかqsモジュールを使用するかを真偽値として指定
app.use(session({secret: 'randomstringsessionsecret'}));

//クッキーとはクライアント側
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