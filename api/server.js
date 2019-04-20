
var express = require('express'),
app = express(),
port = process.env.PORT || 3001,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/apiRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('API for sending text message up and running on port:: ' + port);