module.exports = function(app)
{


//Login required to access certain pages
  const { check, validationResult } = require('express-validator');
  const { MongoClient } = require("mongodb");

   const redirectLogin = (req, res, next) => {
   if (!req.session.userId ) {
     res.redirect('./login')
   } else { next (); }
   }

//Homepage route
     app.get('/',function(req,res){
        res.render('index.html');
	console.log("test linea");
     });


//About route
     app.get('/about',function(req,res){
        res.render('about.html');
    });


// Search food route
    app.get('/search', function(req,res){
         res.render("search.html");
     });
  app.get('/search-result', function (req, res) {    	          

/*
//Connect to database with mongo db
      var keyword = req.query.keyword;
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('mycaloriesapp');
*/

	var keyword = req.query.keyword;
	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	instance.connect((err, client) => {
  	if (err) console.log('failed to connect')
  	else {
        const database = client.db('mycaloriesapp');

	database.collection('food').findOne( {name: {$regex: keyword, $options:'i'}}, function(findErr, results) {

	if (findErr) throw findErr;
//If food does not exit display send error message       
	if (!results){
        res.send('Sorry, none of the food contains your keyword, please try with a different word again.'  + '<br />' +
	'Want to try again?: '+ '<a href='+'/search'+'>Search again</a>' + '<br />'+ 'Go back home?'+'<a href='+'./'+'>Home</a>');
	} 
//else if keyword matches food display matched food
	else{
 	database.collection('food').find({ name: {$regex: keyword, $options:'i'}  }).toArray((findErr, results) => {
        if (findErr) throw findErr;
	else
	res.render('list3.ejs', {availablefood:results});
	//client.close();
	});        
	}});
     }});
});





// Update food route 
  app.get('/updatefood', redirectLogin, function (req,res) {
         res.render('updatefood.html');
      });
          
  app.post('/updated', function (req,res) {

/*
        // saving data in database
        //Connect to database with mongo db
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';
	//const field = req.body.updatefield;
       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
*/
	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	instance.connect((err, client) => {
 	  if (err) console.log('failed to connect')
  	  else {

		var field = req.body.updatefield;
		var field_value = req.body.updatevalue;

        	const database = client.db('mycaloriesapp');
        	//database.collection('users').findOne( {username: req.body.username }, function(findErr, results) {
        	//if (findErr) throw findErr;
       
		database.collection('food').findOne({name: req.body.name}, function(err, result){
		if (err) throw err;
		//If food name not found display error message
        	if (!result){
        	res.send('Sorry, the food name does not exist, please check and try again.'  + '<br />' + 'Try to update again?: '+
		 '<a href='+'/updatefood'+'>Update</a>' + '<br />'+ 'Go back home?'+'<a href='+'./'+'>Home</a>');
        	} 
	
		if (result.author != req.session.userId){
		res.send('Sorry, you can only update the items you have added, please check and try again.'  + '<br />' + 'Try to update again?: '+
		'<a href='+'/updatefood'+'>Update</a>' + '<br />'+ 'Go back home?'+'<a href='+'./'+'>Home</a>');
		}
	
		//else if name is found, update food
		else{
	
			database.collection('food').updateOne({name: req.body.name},
			{ $set: { field: field_value }})
        
       		client.close();
        	res.send('The food: ' +req.body.name+ ' has been updated. The updated field is: '+ req.body.updatefield+ ', its  new value is: '+req.body.updatevalue+
			'<br />' + 'Want to update something else?: '+ '<a href='+'/updatefood'+'>Keep updating</a>' + '<br />'+ 'Go back home?'+'<a href='+'./'+'>Home</a>');
		 }});
	  }});
});





// Register route 		
  app.get('/register', function (req,res) {
         res.render('register.html');                                                                     
      });
	
//Apply validation to registeration page
      app.post('/registered',[check('email').isEmail()],[check('password').isLength({ min: 8})],[check('username').isLength({ min: 5})], [check('firstname').notEmpty()], [check('lastname').notEmpty()], function (req,res) {
        
	const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.send("Sorry, there's been a problem with the data provided, please remember to fill all fields, follow the 		minimun lenght rules and provide a valid email"
	  + '<br />' + 'Want to try again?: '+ '<a href='+'/register'+'>Register</a>'+'<br />'+'Go back home?'+
	'<a href='+'./'+'>Home</a>'); }

//	res.redirect('./register'); }
       else {
     //   var MongoClient = require('mongodb').MongoClient;
       // var url = 'mongodb://localhost';
       // MongoClient.connect(url, function(err, client) {
        // if (err) throw err;
        // var db = client.db ('mycaloriesapp');
       // db.collection('users').findOne( {username: req.body.username }, function(findErr, results) { 
        // if (findErr) throw findErr;
 //If food name is take display send error message       
         //if (results){
        // res.send('Sorry, the username is already in use, please try with a different word again.'  + '<br />' +
         //'Want to try again?: '+ '<a href='+'/register'+'>Register </a>'+'<br />'+'Go back home?: '+'<a href='+'./'+'>Home</a>');
        // }


        var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
        const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); 
        instance.connect((err, client) => {
          if (err) console.log('failed to connect')
          else {
                const database = client.db('mycaloriesapp');
    
                database.collection('users').findOne( {username: req.body.username }, function(findErr, results) {
		if (findErr) throw findErr;
                else
		//If food name is take display send error message       
         	if (results){
         	res.send('Sorry, the username is already in use, please try with a different word again.'  + '<br />' +
         	'Want to try again?: '+ '<a href='+'/register'+'>Register </a>'+'<br />'+'Go back home?: '+'<a href='+'./'+'>Home</a>');
         	}

		else{

	 
		const bcrypt = require('bcryptjs');
		const saltRounds = 10;
	//Sanatize and store password as plainPassword
		const plainPassword = req.sanitize(req.body.password);

	//Connect to database with mongo db
      	// var MongoClient = require('mongodb').MongoClient;
      	// var url = 'mongodb://localhost';
 	
		//Hash password
       		bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        	// Store hashed password in your database.
                                                                                                            
      		// MongoClient.connect(url, function(err, client) {
       		// if (err) throw err;
       		// var db = client.db ('mycaloriesapp');  
        
		database.collection('users').insertOne({
        	username: req.body.username,
        	password: hashedPassword,
		email: req.body.email,                                    
		firstname: req.body.firstname,
		lastname: req.body.lastname                                                             
       	 	});
	
		//client.close();

        	res.send( 'Hey, ' + req.body.firstname + ' '+ req.body.lastname + 
		', You are now registered. ' + 'Your username is '+ req.body.username + 
		', your email is ' + req.body.email + '<br />'+ 'Your password is '+ req.body.password + 
		'<br />'+'<a href='+'./'+'>Home</a>');
        	});
    	 }});
    	}});
   }});





// Food List (mongodb) route 
 app.get('/list', function(req, res) {
     //Connect to database with mongo db
      
	/*
	var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('mycaloriesapp');
      db.collection('food').find().sort({name: 1}).toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
       res.render('list.ejs', {availablefood:results});
    client.close();
	*/



	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	instance.connect((err, client) => {
 	  if (err) console.log('failed to connect')
  	  else {
        	const database = client.db('mycaloriesapp');
       		
       		database.collection('food').find().sort({name: 1}).toArray((findErr, results) => {	
		if (findErr) throw findErr;
		else
		res.render('list.ejs', {availablefood:results});
		//res.render(results);
  		});
	  }});
   });


/*
const client = new MongoClient(url);

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
run();
*/

// Add food route 
 // app.get('/addfood', redirectLogin, function (req,res) {
	app.get('/addfood', redirectLogin, function (req,res) {
      	res.render('addfood.html');                                             
      	});

  app.post('/foodadded',[check('name').notEmpty()], [check('value').notEmpty()], [check('typValue').notEmpty()], 
  [check('calories').isDecimal()],[check('carbs').isDecimal()], [check('fat').isDecimal()], [check('protein').isDecimal()], 
  [check('salt').isDecimal()],[check('sugar').isDecimal()], function (req,res) {
	
	const errors = validationResult(req);
        if (!errors.isEmpty()) {
//if form validation rueles are not met display error message
	res.send("Sorry, there's been a problem with the data provided, please remember to fill all fields, and provide only a decimal value for:  carbs,  calories,  fat,  protein,  salt and  sugar"
          + '<br />' + 'Want to try again?: '+ '<a href='+'/addfood'+'>Add food</a>'+'<br />'+'Go back home?: '+
        '<a href='+'./'+'>Home</a>'); }

       	else {

	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); 
	// notice 'client' in the callback
	instance.connect((err, client) => {
  	  if (err) console.log('failed to connect')
  	  else {
		const database = client.db('mycaloriesapp');
		database.collection('food').findOne( {name: req.body.name }, function(findErr, results) {

		if (findErr) throw findErr;
		//If food name is take display send error message   
		
		if (results){
		console.log("name taken already");
		res.send('Sorry, the name is already in use, please try with a different word again.'  + '<br />' + 'Want to try again?: '+ '<a href='+'/addfood'+'>Add food</a>'+'<br />'+'Go back home?: '+'<a href='+'./'+'>Home</a>');
		}

		else{

    		console.log('connected to mongodb')
    		//const database = client.db('mycaloriesapp');
    		database.collection('food').insertOne({
		name: req.body.name,
		value: req.body.value,
		typValue: req.body.typValue,
		calories: req.body.calories,  
		carbs: req.body.carbs,
		fat: req.body.fat,
		protein: req.body.protein,
		salt: req.body.salt,  
		sugar: req.body.sugar,
		author: req.session.userId
		});
		
		//database.collection('users').findOne({ username: 'jgloo011' }).then(function(users){
    		//console.log(users);
    		//}); 

		res.send(' The following food has been added to the database, name: '+"'"+ req.body.name +"'"+
        	 ',  typical values per '+"'"+  req.body.value + "'" + ',  unit of typical value: '+ "'"+ req.body.typValue +"'"+ 
        	 ',  calories: '+ "'"+ req.body.calories +"'"+  ' kilocalories' +"'"+ ',  carbs: '+"'"+ req.body.carbs+"'g"+
        	 ',  fat: '+"'"+ req.body.fat+"'" + ', protein: '+"'"+ req.body.protein+"'g"+  ',  salt: ' +"'"+ req.body.salt+"'g"+
        	 ',  sugar: '+"'" +req.body.sugar+"'g"+  
        	 '<br />' + 'Want to keep adding food?: '+ '<a href='+'/addfood'+'>Keep adding</a>' +
        	 '<br />'+ 'Go back home?: '+'<a href='+'./'+'>Home</a>')
        	}});
	}});
}});
       


	//const client = new MongoClient(url);
	//client.connect();
	//var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	//var database = client.db('mycaloriesapp');
	//const food = database.collection('food');
	//var query = { name: req.body.name };
	
	//database.collection('food').findOne( {name: req.body.name }, function(findErr, results) {

	   /*
 	// saving data in database
	//Connect to database with mongo db
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';
                                                                                                              
       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('mycaloriesapp');  
  
	db.collection('food').findOne( {name: req.body.name }, function(findErr, results) {



        if (findErr) throw findErr;
//If food name is take display send error message       
        if (results){
        res.send('Sorry, the name is already in use, please try with a different word again.'  + '<br />' +
        'Want to try again?: '+ '<a href='+'/addfood'+'>Add food</a>'+'<br />'+'Go back home?: '+'<a href='+'./'+'>Home</a>');
        }
//else if name is free display matched food
        else{

	database.collection('food').insertOne({
        name: req.body.name,
        value: req.body.value,
        typValue: req.body.typValue,
        calories: req.body.calories,  
        carbs: req.body.carbs,
        fat: req.body.fat,
        protein: req.body.protein,
        salt: req.body.salt,   
	sugar: req.body.sugar,
	author: req.session.userId	
                                                                                                 
        });
//        client.close();
        res.send(' The following food has been added to the database, name: '+"'"+ req.body.name +"'"+
	 ',  typical values per '+"'"+  req.body.value + "'" + ',  unit of typical value: '+ "'"+ req.body.typValue +"'"+ 
 	 ',  calories: '+ "'"+ req.body.calories +"'"+  ' kilocalories' +"'"+ ',  carbs: '+"'"+ req.body.carbs+"'g"+
	 ',  fat: '+"'"+ req.body.fat+"'" + ', protein: '+"'"+ req.body.protein+"'g"+  ',  salt: ' +"'"+ req.body.salt+"'g"+
	 ',  sugar: '+"'" +req.body.sugar+"'g"+  
 	 '<br />' + 'Want to keep adding food?: '+ '<a href='+'/addfood'+'>Keep adding</a>' +
	 '<br />'+ 'Go back home?: '+'<a href='+'./'+'>Home</a>')
	}});
        }});
      // });

*/



/* Add recipe route 
  app.get('/addrecipe', function (req,res) {
         res.render('addrecipe.html');
      });
              app.post('/addedrecipe', function (req,res) {

        //Connect to database with mongo db
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';

       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('mycaloriesapp');

        
     db.collection('food').find({name: {$in: [req.body.item1, req.body.item2, req.body.item3]}}).sort({name: 1}).toArray((findErr, results) => {
      if (findErr) throw findErr;
      else	
      res.render('list2.ejs', {availablefood:results});
      client.close();
	});
	});
});




/*
//List users route 
app.get('/listusers', function(req, res) {
     
	//Connect to database with mongo db
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('mycaloriesapp');
      db.collection('users').find().toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
         res.render('listusers.html', {availableusers:results});
      client.close();
      

	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	
	instance.connect((err, client) => {
 	  if (err) console.log('failed to connect')
  	  else {
        	const database = client.db('mycaloriesapp');
		db.collection('users').find().toArray((findErr, results) => {        	
        	if (findErr) throw findErr;
		else
		res.render('listusers.html', {availableusers:results});
			});
		};
        });
});

*/



// Login route 
app.get('/login', function(req, res) {
res.render('login.html')
});

app.post('/loggedin', function(req, res) {

	//this was just commented out
       const bcrypt = require('bcryptjs');

     //Connect to database with mongo db
/*	var MongoClient = require('mongodb').MongoClient;
     	var url = 'mongodb://localhost';
      	MongoClient.connect(url, function (err, client) {
      	if (err) throw err;
      	var db = client.db('mycaloriesapp');
 */
	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	// notice 'client' in the callback
	instance.connect((err, client) => {
  		if (err) console.log('failed to connect')
  		else {
        	const database = client.db('mycaloriesapp');
		//Find username	
		database.collection('users').findOne({username: req.body.username}, function(err, result)	{
			if (err) throw err;
			//If username not found display error message
			if (!result){
        		res.send('Sorry, the username does not exist, please check and try again.' + '<br />' + 'Want to try to log in again?: '+   
        		'<a href='+'/login'+'>Try again</a>' + '<br />'+ 'Go back home?: '+'<a href='+'./'+'>Home</a>');
			}	
			else {
			hashedPassword = result.password;
			plainPassword = req.body.password;
			//Compare stored hashed password with password input
			bcrypt.compare(plainPassword, hashedPassword, function(err, result) {
			if (err) throw err;
			//Display the mseaage if login is succesful or not
			if (result == true)
			{ 
			// **** save user session here, when login is successful
			req.session.userId = req.body.username;    
			//console.log(db.users.find({}, {ObjectId:1}));
			res.send('You have succesfully logged in, Welcome ' + req.body.username +  '<br />'+'<a href='+'./'+'>Home</a>');
			}	
			else
        		res.send('Sorry, the password is incorrect, please try again.'  + '<br />' + 'Want to try to log in again?: '+ 
			'<a href='+'/login'+'>Try again</a>' + '<br />'+ 'Go back home?: '+'<a href='+'./'+'>Home</a>');
	
			//client.close();
			});
			}});	
	}});
});


// Delete food route
app.get('/deletefood', redirectLogin, function(req, res) {
res.render('deletefood.html')
});

app.post('/fooddeleted', function(req, res) {

/*
     //Connect to database with mongo db	
	var MongoClient = require('mongodb').MongoClient;
        var url = 'mongodb://localhost';
        MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db('mycaloriesapp');
*/

 
	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	// notice 'client' in the callback
	instance.connect((err, client) => {
        if (err) console.log('failed to connect')
        else {
        const database = client.db('mycaloriesapp');
        database.collection('food').findOne({name: req.body.name}, function(err, result){
        	if (err) throw err;
		//If food name not found display error message
        	if (!result){
        	res.send('Sorry, we could not match your name provided with any food name, please check and try again.'  + '<br />' + 
		'Want to try again?: '+ '<a href='+'/deletefood'+'>Delete again</a>' + '<br />'+ 'Go back home?'+'<a href='+'./'+'>Home</a>');
        	}

        	if (result.author != req.session.userId){
        	res.send('Sorry, you can only delete the items you have added, please check and try again.'  + '<br />' + 'Try to delete again?: '+
        	'<a href='+'/deletefood'+'>Delete</a>' + '<br />'+ 'Go back home?'+'<a href='+'./'+'>Home</a>');
        	}
	
		//else Delete food based on name provided
		else{
		database.collection('food').deleteOne({ name: req.body.name}, function(err, result){
		if (err) throw err;
    		else
		res.send('The food: ' + req.body.name + ' has been deleted' + '<br />' + 'Want to delete something else?: '+ 
		'<a href='+'/deletefood'+'>Keep deleting</a>' + '<br />'+ 'Go back home?'+'<a href='+'./'+'>Home</a>');
		//client.close();	
		});
		}});
	}});
});


app.get('/myfood', redirectLogin, function (req,res) {
        var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
        const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); 
        instance.connect((err, client) => {
          if (err) console.log('failed to connect')
          else {
                const database = client.db('mycaloriesapp');
    
                database.collection('food').find({author: req.session.userId}).sort({name: 1}).toArray((findErr, results) => {     
                if (findErr) throw findErr;
                else
                res.render('myfood.ejs', {availablefood:results});
                }); 
         }});
   }); 



// Logout route 
  app.get('/logout', redirectLogin, (req,res) => {
     req.session.destroy(err => {
     if (err) {
       return res.redirect('./')
     }
     res.send('you are now logged out.'+ '<br />'+'<a href='+'./'+'>Home</a>');
     })
   })





// Api route 
app.get('/api', function (req,res) {
     
/*	//Connect to database with mongo db
     var MongoClient = require('mongodb').MongoClient;
     var url = 'mongodb://localhost';
     MongoClient.connect(url, function (err, client) {
     if (err) throw err                                                                                                                                                
     var db = client.db('mycaloriesapp');
*/
	//Display food list	

	var url = "mongodb+srv://Admin-RM:mongopassrmadmin@project1.6dzot.mongodb.net/testlistdb";
	const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	instance.connect((err, client) => {
	if (err) console.log('failed to connect')
	else {
	const database = client.db('mycaloriesapp');
	database.collection('food').find().toArray((findErr, results) => {
		if (findErr) throw findErr;
      		else
        	res.json(results);	 
  	});
	}});
});






};
