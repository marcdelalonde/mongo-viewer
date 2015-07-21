var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

// We use session
app.use(session({secret: 'secret'}));
app.use(express.static(__dirname + '/public'));

/*mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function (callback) {
  console.log('MongoDB connection OK!');
});*/


// --------------------------------------------

/*var movieSchema = new mongoose.Schema({
	title: String,
	rating: String,
	releaseYear: Number,
	hasCreditCookie: Boolean
});*/

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
//var Movie = mongoose.model('Movie', movieSchema);

/*
var thor = new Movie({
	title: 'Thor',
	rating: 'PG-13',
	releaseYear: '2011',
	hasCreditCookie: true
});

thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir(thor);
});*/

// ---------------------------------------------

// List all databases
app.get('/api/databases', function(req, res) {

	MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, db) {
	  if (err) throw err;

	  var adminDb = db.admin();
	  // List all the available databases
	  adminDb.listDatabases(function(err, dbs) {
	    res.json(dbs);
	  });

	});

});

// List all collections from a database
app.get('/api/collections/:database', function(req, res) { 
    
    MongoClient.connect('mongodb://127.0.0.1:27017/' + req.params.database, function(err, db) {
		if (err) throw err;

		db.collections(function(err, collections){
			var list = [];
			for (var i=0; i < collections.length; i++) {
				list.push({
					name: collections[i].s.name
				});
			}
			res.json({collections:list});
		});

	});

});

app.get('*', function(req, res) { 
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.listen(8080);