var express = require ('express');
var bodyParser= require ('body-parser');
var session = require ('express-session');
var validator = require ('express-validator');

const expressSanitizer = require('express-sanitizer');
const app = express()
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");


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


/*
mongoose.connect(
 "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb",
 {
    useNewUrlParser: true,
 // useFindAndModify: false,
    useUnifiedTopology: true
  }
);
*/

/* Connect to mongodb database */
//var MongoClient = require('mongodb').MongoClient;

//var url = "mongodb://localhost/mybookshopdb";

//var uri = "mongodb+srv://RenzoMoises:mongopass97@project1.6dzot.mongodb.net/?retryWrites=true&w=majority";


//const mongoose = require('mongoose');


var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
 

//const client = new MongoClient(url);

 
const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// notice 'client' in the callback
instance.connect((err, client) => {
  if (err) console.log('failed to connect')
  else {
    console.log('connected to mongodb')
    const database = client.db('mycaloriesapp');
    database.collection('users').findOne({ username: 'jgloo011' }).then(function(users){
//    console.log(users);
    });
  };
});





/*
async function run() {
  try {
    await client.connect();
    const database = client.db('mycaloriesapp');
    const users = database.collection('users');
    // Query for a movie that has the title 'Back to the Future'
    const query = { username: 'jgloo011' };
    const user = await users.findOne(query);
    console.log(user);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//run().catch(console.dir);
//run();

//function run(){


//const client = new MongoClient(url);

client.connect();
const database = client.db('mycaloriesapp');
const users = database.collection('users');
const query = { username: 'jgloo011' };
const user = users.findOne(query);
console.log(user);
client.close();
	
//run();
//client.close();


//async function run(){
// await client.connect();





/*
const connectionParams={
	useNewUrlParser: true,
	useUnifiedTopology: true
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/
