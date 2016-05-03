var express = require('express');
var router = express.Router();

router.get('/index', function(req,res){
    res.render("index.html" );
});
router.get('/user', function(req,res){
    res.render("user.html" );
});
router.get('/insertbook', function(req,res){
    res.render("createbook.html" );
});
router.get('/bookdetails', function(req,res){
    res.render("bookdetails.html" );
});
module.exports = router;
