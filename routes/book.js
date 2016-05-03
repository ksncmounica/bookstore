var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var User   = require('../models/user'); 

var auth = function(req, res, next){
 var userId = req.params.userid;
 User.findOne({"_id":userId}, function(err , user){
    console.log(user);
    if(user){
        if(user.role == 'admin'){
            console.log("He has access");
            next();
        }else{
            res.json({ message: 'not authorized' });
        }
    }
 });
};


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/getbooks', function(req, res) {
    Book.find(function(err, book) {
            if (err)
                res.send(err);
            res.json(book);
        });

});
// more routes for our API will happen here
/*
// create a book (accessed at POST http://localhost:3000-/createbook)
router.post('/:userid/createbook',auth,function(req, res) {
    var book = new Book();
    book.bookisbn = req.body.id; 
    book.bookname = req.body.name; 
    console.log(book);
    book.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Book created!' });
    });
});
*/

router.post('/createbook',function(req, res) {
    var book = new Book();
    book.bookisbn = req.body.bookisbn; 
    book.bookname = req.body.bookname; 
    book.authorname = req.body.authorname;
    book.authorid = req.body.authorid;
    console.log(book);
    book.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Book created!' });
    });
});
module.exports = router;
