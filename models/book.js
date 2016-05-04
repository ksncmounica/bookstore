var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
    bookname: String,
    bookisbn: String,
    authorname: String,
    authorid: String  
});

module.exports = mongoose.model('Book', BookSchema);