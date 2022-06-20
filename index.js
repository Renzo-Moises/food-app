var express = require ('express');
var bodyParser= require ('body-parser');
var session = require ('express-session');
var validator = require ('express-validator');

const expressSanitizer = require('express-sanitizer');
const app = express()
const port = 8000
const mysql = require('mysql');
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Ambition974!',
    database: 'myBookshop'
});

/* 
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
*/

global.db = db;

app.use(express.static(__dirname + '/public'));

app.use(expressSanitizer());

app.use(bodyParser.urlencoded({ extended: true }));

//added for session management
app.use(session({
    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

require('./routes/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* Connect to mongodb database */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/mybookshopdb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

