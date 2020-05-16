var express = require('express');
var Router = express.Router();

Router.post('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});

module.exports = Router;