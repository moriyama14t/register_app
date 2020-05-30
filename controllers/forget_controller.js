var express = require('express');
var Router = express.Router();
var models = require('../models');
const { validationResult } = require('express-validator');
const ForgetValidator = require('../validators/forget_validator');
//上読み込み過ぎじゃないか？
//エンジニアとディスカッション

Router.get('/forget',function(req,res){
    res.render('account/forget', {data: ""});
});

Router.post('/forget',ForgetValidator,function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errors_array = errors.array()
        var data ={
            email: req.body.email,
            question: req.body.question,
            errors: errors_array,
            error: ""
        }
        res.render('account/forget', {data});
    }else{
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
                var data ={
                    email: req.body.email,
                    question: req.body.question,
                    errors: "",
                    error: "メールアドレスか好きな食べ物が違います。または会員登録がされていません"
                }
                res.render('account/forget',{data});
            }
        });
    }    
});

module.exports = Router;