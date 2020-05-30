var express = require('express');
var Router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const EditValidator = require('../validators/edit_validator');

Router.use(function(req,res,next){
    if(req.session.email == null || req.session.email.length ==0 ){
        res.redirect('/'); 
    }else{
        next();
    }
});

Router.use(){
    
}

Router.get('/edit',function(req,res){
    var data ={
        username : req.session.username,
        email : req.session.email,
        question : req.session.question
    }
    res.render('account/edit',{data: data})
});

Router.post('/edit',EditValidator,function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errors_array = errors.array()
        var data ={
            username: req.body.username,
            email : req.body.email,
            question: req.body.question,
            password: req.body.password,
            errors: errors_array,
            error: ""
        }
        res.render('account/edit', {data});
    }else{
    const passwordHash = bcrypt.hashSync(req.body.password,10);
    models.User.update(
        { username: req.body.username, question: req.body.question,password: passwordHash},
        { where: { email: req.body.email } }
        ).then(() => {
        let newSession = req.session;
        newSession.username = req.body.username;
        newSession.email = req.body.email;
        newSession.question = req.body.question;
        res.redirect('/user');
    }); 
}});

module.exports = Router;