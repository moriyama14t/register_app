var express = require('express');
var Router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');

Router.get('/login',function(req,res){
    res.render('account/login');
});

Router.post('/login',function(req,res){
    var matched_users_promise = models.User.findAll({
        where: 
            {email: req.body.email},
    });
    matched_users_promise.then(function(users){ 
        if(users.length > 0){
            let user = users[0];
            let passwordHash = user.password;
            if(bcrypt.compareSync(req.body.password,passwordHash)){
                req.session.username=user.username;
                req.session.question=user.question;
                req.session.email = req.body.email;
                res.redirect('/');
            }
            else{
                res.redirect('/register');
            }
        }
        else{
            res.redirect('/register');
        }
    });
});


module.exports = Router;