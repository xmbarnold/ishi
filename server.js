var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

var server = app.listen(2000, function() { // replace 2000 with port of choice
    console.log('SERVER RUNNING @ localhost:2000');
})

require('./server/config/mongoose');
require('./server/config/routes')(app);