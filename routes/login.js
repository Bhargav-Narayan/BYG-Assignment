var express = require('express')
var loginController = express.Router();
var app = express()
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var connection = require('./db.js');

// Serve signup page
loginController.get("/signup", function(req, res) {
    res.render('signup')
})

// Hangling signup logic
// first checks whether the email exists in the database. If exists, then send email already exists message 
// If email doesn't exists then save the data in DB.
loginController.post("/handle_signup", function(req, res) {
    console.log(req.body);
    if (req.body) {
        var selectLoginQuery = "select * from user_logins where email = '" + req.body.email + "'"; 
        console.log(selectLoginQuery)
        connection.query(selectLoginQuery, function(err, rows) { // query to search whether email exists.
            if (err) {
                console.log(err);
                return res.status(500).send("Something went wrong")
            } else {
                console.log(rows.length)
                if (rows.length == 0) {

                    var queryString = "INSERT INTO user_logins (email, password, username) VALUES ('" + req.body.email + "', '" + req.body.password + "', '" + req.body.user_name + "')";
                    console.log(queryString)
                    connection.query(queryString, function(err, insertedRows) { // query to insert signup data in login table
                        if (!err) {
                            console.log('The solution is: ', insertedRows);
                            return res.send("Inserted rows successfully")
                        } else {
                            console.log(err)
                            console.log('Error while performing Query.');
                            return res.status(500).send("Something went wrong")
                        }
                    });
                } else {
                    console.log("Email already exists");
                    return res.send("Email Exists")
                }

            }
        })
    } else {
        console.log("Empty request")
        return res.send("Empty request")
    }
})

// Handling login logic
// check whether the combination of user email and password exists in login table.
// If exists then allow user to login. 
// If doesn't exits then inform user that user name and password mismatch
loginController.post("/handle_login", function(req, res) {
    console.log(req.body);
    if (req.body) {
        var selectLoginQuery = "select * from user_logins where email = '" + req.body.email + "' AND password = '" + req.body.password + "';"
        console.log(selectLoginQuery)
        connection.query(selectLoginQuery, function(err, loginData) { // query to check whether the combination of username and password exists.
            if (err) {
                console.log(err);
                res.status(500).send("error")
            } else {
                console.log(loginData)
                if (loginData.length != 0) {
                    res.send("success")
                } else {
                    res.send("")
                }
            }
        })
    } else {
        res.status(500).send("No data in request")
    }
})

module.exports = loginController;
