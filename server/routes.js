var bodyParser 	= require('body-parser'),
	MongoClient = require('mongodb').MongoClient,
	monk 		= require('monk'),
	path 		= require('path');

module.exports = function(router) {

	// List all databases
	router.get('/api/databases', function(req, res) {

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
	router.get('/api/collections/:database', function(req, res) { 
	    
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

	// Get all entries from a collection
	router.get('/api/model/:database/:collection', function(req, res) { 

		var db = monk('localhost:27017/' + req.params.database);
		var collection = db.get(req.params.collection);
	    collection.find({}, function(err, data){
	    	res.json({data:data});
	    });

	});

	// Get an entry
	router.get('/api/model/:database/:collection/:id', function(req, res) { 

		var db = monk('localhost:27017/' + req.params.database);
		var collection = db.get(req.params.collection);
	    collection.findOne({ _id: req.params.id }, function(err, data){
	    	res.json(data);
	    });

	});

	// Delete an entry
	router.delete('/api/model/:database/:collection/:id', function(req, res) { 

		var db = monk('localhost:27017/' + req.params.database);
		var collection = db.get(req.params.collection);
	    collection.remove({ _id: req.params.id }, function(err, data){
	    	res.json({success: true});
	    });

	});

	router.get('*', function(req, res) {
	    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
	});

};