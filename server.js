var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	session 	= require('cookie-session');

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

// ---------------------------------------------

require('./server/routes')(router);

app.listen(8080);