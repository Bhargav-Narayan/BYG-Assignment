var express = require('express')
var dashboardController = express.Router();
var app = express()
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var connection = require('./db.js');

// serve dashboard page
dashboardController.get('/showcase', function(req, res) {
    res.render('dashboard')
})

// Fetch city list from db on load of dashboard page
// selects all the cities present in city table and send.
dashboardController.get('/getCityList', function(req, res) {
    var queryString = "select city_name from city;"
    connection.query(queryString, function(err, rows) {
        if (err) {
            console.log(err);
            return res.status(500).send("Something went wrong")
        } else {
            console.log(rows);
            return res.send(rows)
        }
    })
})

// Fetch all gym associated with the selected city.
// Fetch id of the selected city.
// Using city_id, find all the gyms associated with it
dashboardController.post('/getGymList', function(req, res) {
    console.log(req.body.city);
    var city = req.body.city;
    var selectGymQuery = "select * from city where city_name = '" + city + "';";
    console.log(selectGymQuery)
    connection.query(selectGymQuery, function(err, cityId) { // Qyery to fetch id of the selected city 
        if (err) {
            console.log(err)
            res.status(500).send("Something went wrong")
        } else {
        	console.log(cityId[0].id)
            var gymQuery = "select name, id from gym where city_id = " + cityId[0].id; 
            console.log(gymQuery)
            connection.query(gymQuery, function(err, gymList) { // Query to fetch gym list using the id of the city
                if (err) {
                    console.log(err)
                    res.status(500).send("error")
                } else {
                    console.log(gymList)
                    res.send(gymList)
                }
            })
        }
    })
})

// Fetch all details about a particular Gym.
// Fetch gym data from gym table using the id od the row
dashboardController.post('/getGymData', function(req, res) {
	console.log(req.body);
	var gymQuery = "select * from gym where id = " + req.body.id;
	connection.query(gymQuery, function(err, gymDetails) { // qyery to fetch gym data using id of the gym
		if(err) {
			res.status(500).send("Error")
		} else {
			console.log(gymDetails)
			res.send(gymDetails)
		}
	})
})

module.exports = dashboardController;
