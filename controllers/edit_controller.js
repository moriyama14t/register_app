var express = require('express');
var Router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');

Router.use(function(req,res,next){
    if(req.session.email == null || req.session.email.length ==0 ){
        res.redirect('/login'); 
        }
    else{
        next();
    }
});

Router.get('/edit',function(req,res){
    let username = req.session.username;
    let email = req.session.email;
    let question = req.session.question;
    res.render('account/edit',{
        user_name: username,
        user_email: email,
        user_question: question,
    });
});

Router.post('/edit',function(req,res){
    const passwordHash = bcrypt.hashSync(req.body.password,10);
    models.User.update(
        { username: req.body.username, question: req.body.question,password: passwordHash},
        { where: { email: req.body.email } }
        ).then(() => {
        let newSession = req.session;
        newSession.username = req.body.username;
        newSession.email = req.body.email;
        newSession.question = req.body.question;
        res.redirect('/');
    }); 
});

module.exports = Router;