var mysql = require('mysql'); // Require mysql module

// Setup mysql connection. 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'BUddy007@#',
    database : 'BYG'
});

// Establish mysql connection
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;