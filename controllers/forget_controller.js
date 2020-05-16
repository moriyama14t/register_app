var express = require('express');
var Router = express.Router();
var models = require('../models');

Router.get('/forget',function(req,res){
    res.render('account/forget');
});

Router.post('/forget',function(req,res){
    var matched_users_promise = models.User.findAll({
        where: {
            email: req.body.email,
            question: req.body.question
        }
    });
    matched_users_promise.then(function(users){ 
        if(users.length > 0){
            let user = users[0];
                req.session.id =user.id;
                req.session.username=user.username;
                req.session.question=req.body.question;
                req.session.email = req.body.email;
                res.redirect('/user');
        }else{
            res.redirect('/register');
        }
    });
});


module.exports = Router;