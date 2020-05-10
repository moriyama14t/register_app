var express = require('express');
var Router = express.Router();
var models = require('../models');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var session = require('express-session');
Router.get('/register',function(req,res){  
    res.render('account/register',{errors: ""});
});

Router.post('/register',function(req,res){
    var matched_users_promise = models.User.findAll({
        where:  Sequelize.or(
                {username: req.body.username},
                {email: req.body.email}
            )
    });
    matched_users_promise.then(function(users){ 
        if(users.length == 0){
            const passwordHash = bcrypt.hashSync(req.body.password,10);
            models.User.create({
                username: req.body.username,
                email: req.body.email,
                question: req.body.question,
                password: passwordHash
            }).then(function(){
                let newSession = req.session;
                newSession.username = req.body.username;
                newSession.email = req.body.email;
                newSession.question = req.body.question;
                res.redirect('/');
            });
        }
        else{
            res.render('account/register',{errors: "すでに名前かメールアドレスが使われています"});
        }
    })
});



module.exports = Router;
