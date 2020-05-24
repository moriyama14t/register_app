var express = require('express');
var Router = express.Router();
var models = require('../models');

Router.post('/delete',function(req,res){
    models.User.findOne({
        where: { email: req.session.email }
        }).then(users => {
        users.destroy();
    });
    req.session.destroy();
    res.redirect('/');
});

module.exports = Router;