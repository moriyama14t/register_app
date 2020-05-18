var express = require('express');
var Router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');
var session = require('express-session');

Router.get('/register',function(req,res){  
    res.render('account/register',{errors: ""});
});

const { validationResult } = require('express-validator');
const RegisterValidator = require('../validators/register_validator');
Router.post('/register', RegisterValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errors_array = errors.array()
        res.render('account/register', {
            username: req.body.username,
            email: req.body.email,
            question: req.body.question,
            password: req.body.password,
            errors: errors_array
        });
    }else{
        var matched_users_promise = models.User.findAll({
            where: {email: req.body.email}
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
                    res.redirect('/user');
                });
            }
            else{
                res.render('account/register',{errors: ""});
            }
        });
    };
});




module.exports = Router;