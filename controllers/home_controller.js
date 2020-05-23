var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var Router = express.Router();

Router.use(function(req,res,next){
    if(req.session.email == null || req.session.email.length ==0 ){
        res.redirect('/'); 
        }
    else{
        next();
    }
});

Router.get('/user',function(req,res){
    /*
    let username = req.session.username;
    let email = req.session.email;
    let question = req.session.question;
    res.render('home/index',{
        user_name: username,
        user_email: email,
        user_question: question,
    });
    */
   var data ={
    username : req.session.username,
    email : req.session.email,
    question : req.session.question
}
res.render('home/index',{data: data})
});


module.exports = Router;