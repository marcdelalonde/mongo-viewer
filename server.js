#!/usr/bin/env node

var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	session 	= require('cookie-session'),
	program 	= require('commander');

program
	.version('0.2.0')
	.option('-p, --port <port>', 'Port on which to listen to (defaults to 8080)', parseInt)
	.parse(process.argv);

var port = process.env.PORT || program.port || 8080;

var app = express();
var router = express.Router();

// We use session
app.use(session({secret: 'secret'}));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(router);

console.log('Mongo-Viewer app is started and listening on port ' + port);

// ---------------------------------------------

require('./server/routes')(router);

app.listen(port);