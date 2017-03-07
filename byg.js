// import all required modules
var express = require('express')
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');

// Seting the template engine
app.set('view engine', 'ejs');

// Setup express app 
var app = express()

// import all application modules
var login = require('./routes/login.js');
var dashboard = require('./routes/dashboard.js')
var connection = require('./routes/db.js');

// Serving static files
app.use('/assets', express.static('views/assets'));

app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
})); // support encoded bodies

// Starting route of the app
app.get('/', function(req, res) {
    res.render('login')
})

// Routing logic
app.use('/login', login);
app.use('/dashboard', dashboard)

// Setup http server
var httpserver = http.createServer(app).listen(3000, function() {
    var host = httpserver.address().address;
    var port = httpserver.address().port;
    console.log('app listening at http://%s:%s', host, port);
});
