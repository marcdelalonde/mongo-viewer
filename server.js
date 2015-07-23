var express 	= require('express'),
	session 	= require('cookie-session');

var app = express();
var router = express.Router();

// We use session
app.use(session({secret: 'secret'}));
app.use(express.static(__dirname + '/dist'));
app.use(router);

// ---------------------------------------------

require('./server/routes')(router);

app.listen(8080);