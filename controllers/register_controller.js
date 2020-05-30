var express = require('express');
var Router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');
var session = require('express-session');
const { validationResult } = require('express-validator');
const RegisterValidator = require('../validators/register_validator');
Roterは何？
Router.get('/register',function(req,res){  
    res.render('account/register',{data : ""});
});
//↑は何をしている？
//res.render('account/register',{data : ""});
//エンジニアっぽい表現


Router.post('/register', RegisterValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errors_array = errors.array()//配列
        var data ={
            username: req.body.username,
            email: req.body.email,
            question: req.body.question,
            password: req.body.password,
            errors: errors_array,
            error: ""
        }
        res.render('account/register', {data});
    }else{
        var matched_users_promise = models.User.findAll({
            where: {email: req.body.email}
            SELECT *FROM USERS WHERE email=req.body.email
            

        });
        matched_users_promise
        .then(function(users){
            if(users.length == 0){
            //(↑配列？文字列？？)
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
                var data ={
                    username: req.body.username,
                    email: req.body.email,
                    question: req.body.question,
                    password: req.body.password,            
                    errors: "",
                    error: "メールアドレスがすでに登録されています"}
                res.render('account/register',{data});
                
            }
        });

        let a = 0;//（非同期処理）
    };
});

module.exports = Router;