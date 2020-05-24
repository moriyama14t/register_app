var express = require('express');
var Router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const LoginValidator = require('../validators/login_validator');

Router.get('/',function(req,res){
    res.render('account/login', {data: ""});
});

Router.post('/login',LoginValidator,function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errors_array = errors.array()
        var data ={
            email: req.body.email,
            errors: errors_array,
            error: ""
        }
        res.render('account/login', {data});
    }else{
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
                    res.redirect('/user');
                }else{
                    var data ={
                        email: req.body.email,
                        errors: "",
                        error: "メールアドレスかパスワードが違います。または会員登録がされていません"
                    }
                    res.render('account/login', {data});
                }
            }else{
                var data ={
                    email: req.body.email,
                    errors: "",
                    error: "メールアドレスかパスワードが違います。または会員登録がされていません"
                }
                res.render('account/login', {data});
            }
        });
    }   
});

module.exports = Router;