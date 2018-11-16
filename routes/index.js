var express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var shortid = require('shortid');
const fs = require("fs");
var router = express.Router();
const adapter = new FileSync("./public/JSON-file/MyData.json");
const db = lowdb(adapter);
const MyData = db.get('arr').find({id: "1"}).value();
const countsBooks = db.get('arr').size();
//console.log(parseInt(countsBooks));
var books = JSON.parse(fs.readFileSync('./public/JSON-file/MyData.json','utf-8'));
let filter_t=0;
console.log(books);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Library' });
  console.log(req.method+" "+req.url);
});

router.get('/AddBook', function(req, res, next) {
    res.render('AddBook', { title: 'New book' });
    console.log(req.method+" "+req.url);
    next();
});

router.get('/booksShow', function(req, res, next) {
    res.render('booksShow', { title: 'List of books' ,books: books.arr,filter:filter_t});
    console.log(req.method+" "+req.url);
    next();
});

router.get('/book/:id([a-zA-Z0-9]{1,})', (req, res, next) => {
    const id = req.params.id;
    var book = books.arr.find(b => b.id === id);
    if (book) {
        res.render('bookID', { title: 'Books`s page', book: book});
    }
    next();
});

router.get('/DeleteBook', function(req, res, next) {
    res.render('DeleteBook', { title: 'Delete book' });
    console.log(req.method+" "+req.url);
    next();
});

router.put('/ajax', (req, res) => {
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    console.log(req.body.id);
    db.get('arr')
        .push(req.body)
        .write();
    books.arr.push(req.body);
    //db.get('arr').push(req.body);
    res.status(200);
});

router.put('/ajaxTake', function(req, res, next) {//----------------------
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    var book = req.body;
    console.log(book);
    var index = -1;
    for(let i = 0; i < books.arr.length; i++) {
        if (books.arr[i].id === book.id) {
            index = i;
        }
    }
    console.log(index);
    if (index !== -1) {
        books.arr[index].stock = "No";
        //books.arr[index].master = {name:book.master.name, passport: book.master.passport}
        books.arr[index].return_date = book.return_date;
        books.arr[index].surname = book.surname;
        books.arr[index].name_t = book.name_t;
    }
    console.log(books.arr[index]);
    db.get('arr')
        .find({id: book.id})
        .assign({ stock:"No",return_date:book.return_date,surname:book.surname,name_t:book.name_t})
        .write();
    //db.get('arr').push(req.body);
    res.status(200);
});

router.put('/ajaxPut', function(req, res, next) {//----------------------
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    var book = req.body;
    console.log(book);
    var index = -1;
    for(let i = 0; i < books.arr.length; i++) {
        if (books.arr[i].id === book.id) {
            index = i;
        }
    }
    console.log(index);
    if (index !== -1) {
        books.arr[index].stock = "Yes";
        //books.arr[index].master = {name:book.master.name, passport: book.master.passport}
        books.arr[index].return_date = null;
    }
    console.log(books.arr[index]);
    db.get('arr')
        .find({id: book.id})
        .assign({ stock:"Yes",return_date: null,surname:null,name_t:null})
        .write();
    //db.get('arr').push(req.body);
    res.status(200);
});

router.put('/ajaxChange', function(req, res, next) {//----------------------
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    var book = req.body;
    console.log(book);
    var index = -1;
    for(let i = 0; i < books.arr.length; i++) {
        if (books.arr[i].id === book.id) {
            index = i;
        }
    }
    console.log(index);
    if (index !== -1) {
        books.arr[index].name = book.name;
        books.arr[index].author = book.author;
        books.arr[index].data = book.data;
        //books.arr[index].master = {name:book.master.name, passport: book.master.passport}
        //books.arr[index].return_date = null;
    }
    console.log(books.arr[index]);
    db.get('arr')
        .find({id: book.id})
        .assign({ name:book.name,data: book.data,author:book.author})
        .write();
    //db.get('arr').push(req.body);
    res.status(200);
});


router.delete('/ajaxDel', (req,res) => {
    var book = req.body;
    console.log(book.name+"=="+book.id+"-====");
    var index = -1;
    for(let i = 0; i < books.arr.length; i++) {
        if (books.arr[i].id === book.id) {
            index = i;
        }
    }
    if(book.name===null) {
        db.get('arr')
             .remove({id:book.id})
             .write();
    }else {
        db.get('arr')
            .remove({name:book.name})
            .write();
    }
    books.arr.splice(index,1);
    //console.log(index)
    //if (index !== -1) {
    //    books.arr.splice(index,1)
    //}
    res.status(200);
});

router.put('/filter0', function(req, res,next) {
    //res.render('booksShow', { title: 'Delete book' ,books: books.arr,filter:2});
    console.log(req.method+" "+req.url);
    res.statusCode =200;
    filter_t=0;
});
router.put('/filter1', function(req, res,next) {
    //res.render('booksShow', { title: 'Delete book' ,books: books.arr,filter:2});
    console.log(req.method+" "+req.url);
    res.statusCode =200;
    filter_t=1;
});
router.put('/filter2', function(req, res,next) {
    //res.render('booksShow', { title: 'Delete book' ,books: books.arr,filter:2});
    console.log(req.method+" "+req.url);
    res.statusCode =200;
    filter_t=2;
});

router.get('*', (req, res) => {
    res.status(404);
});


module.exports = adapter;
module.exports = FileSync;
module.exports = lowdb;
module.exports = router;