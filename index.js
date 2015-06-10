var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('webapp'));

app.get('/api/v1/todos', function (req, res) {
	var username = req.body.username;
	var data = [
	    {
	      "title" : "Get Milk",
	      "description" : "2% Milk from Frys"
	    }
	  ]
	res.send({
		"result" : data
	});
});

app.get('/api/v1/user', function (req, res) {
	var username = req.body.username;
	var data = [
	    {
	      "name" : "Jacob Carter",
	      "title" : "Software Engineer"
	    }
	  ]
	res.send({
		"result" : data
	});
});