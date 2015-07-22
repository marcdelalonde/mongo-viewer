var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var monk = require('monk');
var path = require('path');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

// We use session
app.use(session({secret: 'secret'}));
app.use(express.static(__dirname + '/public'));

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

app.get('/api/model/:database/:collection', function(req, res) { 

	var db = monk('localhost:27017/' + req.params.database);
	var collection = db.get(req.params.collection);
    collection.find({}, {}, function(e, data){
    	res.json({data:data});
    });

});

app.get('*', function(req, res) { 
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.listen(8080);