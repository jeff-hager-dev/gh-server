var express = require('express');
var phoneController = express.Router();
var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');

module.exports = function(req, res){
        var tropo = new tropowebapi.TropoWebAPI();
    console.log(req.body);
    var session = utils.getSession(req.body);
	    	
	tropo.say("Welcome to Service St. Louis.");

    // Demonstrates how to use the base Tropo action classes.
    var say = new Say("Please enter your 5 digit zip code.");
    var choices = new Choices("[5 DIGITS]");

    // Action classes can be passes as parameters to TropoWebAPI class methods.
    tropo.ask(choices, 3, false, null, "foo", null, true, say, 5, null);
    tropo.on("continue", null, states.answer, true);

	res.end(TropoJSON(tropo)); 
};