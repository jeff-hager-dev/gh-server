var utils = require('./utils');
var states = require('./states');
var tropowebapi = require('tropo-webapi');
var calls = require('./calls');
var questions = require('./questions');
var _ = require('lodash');

module.exports = function(req, res){
    console.log('test');
    var tropo = new tropowebapi.TropoWebAPI();

    var session = utils.getSession(req.body);

    calls.addCaller(session.callId, {});
	    	
	  tropo.say(questions.Welcome.Text);

    // Demonstrates how to use the base Tropo action classes.
    console.log(_.map(questions.Welcome.Choices, "option").join(','));
    var choices = new Choices(_.map(questions.Welcome.Choices, "options").join(','));

    // Action classes can be passes as parameters to TropoWebAPI class methods.
    tropo.ask(choices, 3, false, null, "foo", null, true, say, 5, null);
    tropo.on("continue", null, states.next, true);

	  res.end(TropoJSON(tropo));
};